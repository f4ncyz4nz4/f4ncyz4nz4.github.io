# Gozi String Decryption

The **Gozi/ISFB String Decryptor** challenge, part of the [Zero2Automated](https://courses.zero2auto.com/) series, involves reverse engineering the string decryption routine from a **Gozi/ISFB malware** sample and developing a script to automate the decryption process.
The provided sample is identified by the hash `0a66e8376fc6d9283e500c6e774dc0a109656fd457a0ce7dbf40419bc8d50936`.

The complete solution script can be found on my [GitHub](https://github.com/f4ncyz4nz4/mre_scripts/blob/main/gozi_string_decryption/decrypt.py).

## Unpacking

The analyzed DLL appears to be packed, a common technique used to obfuscate malicious code. To confirm this, we can utilize [Detect It Easy](https://github.com/horsicq/Detect-It-Easy) (DIE), a tool designed to identify packed code and assist in preliminary analysis.

The _Entropy_ section in DIE is particularly useful for this purpose, as it displays the entropy levels of the file, which can indicate packing. In the image below, it's possible to see that there is packing.

![DIE Entropy section](/posts/gozi_string_decryptor/images/die.png "DIE Entropy section")

Since the file is packed, we will first unpack it using dynamic analysis.

Dynamic analysis is conducted using [x64dbg](https://x64dbg.com/), where breakpoints are set on the Windows API functions `VirtualAlloc` and `VirtualProtect` to monitor memory allocation and permission changes.

During execution, the program hits `VirtualAlloc` multiple times:

- **First Hit**: Allocates a memory region of size `0x4A000` with read/write (RW) permissions. The allocated bytes at this stage appear repetitive, potentially as a tactic to mislead analysts.
- **Second Hit**: Allocates a region of `0x6000` bytes with execute/read/write (ERW) permissions. This region's content resembles a compressed PE file but seems too small to be the unpacked payload.

![Compressed PE](/posts/gozi_string_decryptor/images/second_hit.png "Compressed PE")

- **Third Hit**: Allocates a memory region of size `0xE000` bytes. The content here strongly resembles a valid PE file, suggesting this is the unpacked program.

![Unpacked PE](/posts/gozi_string_decryptor/images/third_hit.png "Unpacked PE")

At this stage, the unpacked code appears to be loaded into memory. To verify, we proceed with further analysis of this memory region.

Subsequent execution shifts to the second memory region allocated (`0x6000` bytes). Here, `VirtualProtect` is invoked, changing the permissions of all sections of the DLL being analyzed to RW. This is done to overwrite the first `0xE000` bytes of the DLL with unpacked code.

Once the modifications are complete, the program restores the appropriate permissions for the sections using five separate `VirtualProtect` calls, indicating that the unpacked DLL consists of five distinct sections. Notably, only the first `0xE000` bytes are altered during this process, as reflected by the specific `VirtualProtect` calls.

With the unpacked memory identified, the relevant section can be extracted and saved for further analysis. Before proceeding, it is crucial to perform **unmapping** and **rebasing** to ensure the extracted code is correctly aligned and its imported libraries are properly displayed.

## Analysis

After extracting the DLL, the next step is to identify the encrypted routine within the malicious code and proceed with the challenge.

Using **PE Studio**, we can confirm that the DLL contains sections with encrypted content, suggesting the presence of decryption routines.

To validate this observation, the sample is loaded into [Ghidra](https://ghidra-sre.org/) for static analysis.
Within the `.bss` section, numerous cross-references are present, but the corresponding bytes appear meaningless. This strongly indicates that a decryption process occurs dynamically during execution.

![Cross-references](/posts/gozi_string_decryptor/images/cross-ref.png "Cross-references")

While examining the code, a specific function draws attention as it takes another function as a parameter.
This unusual behavior merits closer inspection.

Further analysis reveals the presence of several recognizable API calls, one of which is particularly significant: `QueueUserAPC`.
This function is a clear indicator that **APC Injection** is being employed by the malware. Supporting this conclusion, the entry point of the thread created by this function is directed to the `SleepEx` function.

![APC Injection](/posts/gozi_string_decryptor/images/apc_injection.png "APC Injection")

### APC Injection

Asynchronous Procedure Call (APC) Injection is a technique where attackers queue a malicious function into the APC queue of a target thread using the `QueueUserAPC` API.
The queued function executes when the thread enters an alertable state, such as during a `SleepEx` or `WaitForSingleObjectEx` call.

In this sample, the presence of the `QueueUserAPC` API, combined with encrypted bytes in the `.bss` section and the thread's entry point being directed to `SleepEx`, strongly indicates APC Injection.

The use of `SleepEx` puts the thread into an alertable state, allowing the queued APC to execute. This technique is highly effective as it leverages legitimate system mechanisms for stealthy execution, blending malicious actions seamlessly with normal thread operations.

### Decryption function

Having identified the APC Injection, we have likely uncovered one of the most critical components of the malware.

The next step is to analyze `FUN_00401308`, a function that appears to play a central role. This function contains several notable calls, each of which we will explore in detail with the ultimate goal of identifying the decryption routine.

The first function call, `FUN_004010C4`, gathers system information. It invokes the `GetVersion` API, but beyond this, it offers little of interest.

The second call is more intriguing. It involves a heap allocation, which is subsequently passed as the third argument to the `NtQuerySystemInformation` function. The allocated memory clearly represents the size of the structure created by `NtQuerySystemInformation`.

This Windows API retrieves system information based on the value of its first argument, `SYSTEM_INFORMATION_CLASS`. Here, the first argument is set to `0x8`, which, according to Geoff Chappell’s documentation, corresponds to the `SYSTEM_PROCESSOR_PERFORMANCE_INFORMATION` structure.

By adding this structure to Ghidra and updating the function signature, it becomes evident that the first field of the structure, `IdleTime`, is being accessed. Interestingly, the function operates within a while loop, but the loop's exit condition is always met if `NtQuerySystemInformation` succeeds, as its return value (NTSTATUS) is 0.

Inside the loop, another operation takes place: the `IdleTime` value undergoes a modulo operation with 19, followed by an addition of 1 and the return value of `NtQuerySystemInformation` (typically 0). The resulting integer appears significant, as it is passed as the sole argument to the function `FUN_0040197C`.

For clarity, let’s call this integer the "magic_argument".

![Magic argument](/posts/gozi_string_decryptor/images/magic_argument.png "Magic argument")

The next step is to analyze `FUN_0040197C`, as it is the last function invoked before the program enters a sleep state.

This function contains a call to `FUN_00401922`, where a crucial discovery is made.
A string `.sbb` is referenced, corresponding (in little-endian) to the `.bss` section of the DLL, which we earlier identified as encrypted. By updating the parameter types in Ghidra to `PIMAGE_DOS_HEADER` and `PIMAGE_SECTION_HEADER`, it becomes clear that the function scans all sections, searching for one named `.bss`. Upon finding it, the `VirtualAddress` and `SizeOfRawData` of the section are retrieved and passed as output parameters to subsequent calls.

![BSS function](/posts/gozi_string_decryptor/images/get_bss.png "BSS function")

This confirms our hypothesis that this section is being decrypted.

Returning to `FUN_0040197C`, it appears to handle the decryption process.

A `VirtualAlloc` call is performed, likely to allocate space for the decrypted data. However, at this stage, no encryption key has been identified.

**Is the encryption keyless**?

The answer lies in three assembly instructions involving `MOVSD <address>`. Following these addresses to the `.data` section reveals a hardcoded string: "**Apr 26 2022**".

This is unlikely to be a coincidence.

The string undergoes a straightforward transformation to generate the decryption key. The string is 11 bytes long, and the key is computed using the following formula:

```
key = date_bytes_from_0_to_4 + date_bytes_from_4_to_8 + bss_va + magic_argument - 1
```

The importance of the "magic_argument" becomes apparent here, as it directly influences the decryption key.

Once computed, the key is passed as the third argument to `FUN_00401FD8`. The first argument is the address of the allocated memory, the second is a pointer to the `.bss` section (containing the encrypted data), and the fourth is the size of the `.bss` section.

![Decryption function](/posts/gozi_string_decryptor/images/decryption_func.png "Decryption function")

At this point, we have identified the decryption function, and we can proceed to replicate it in Python.

Before moving on, two key observations should be noted:

1. The decryption function operates within a while loop. The exit condition is the successful decryption of the entire `.bss` section. Each iteration processes `0x1000` bytes of encrypted data.
2. The malware validates the decryption process by comparing a variable to the value `0x69B25F44`. If the comparison is successful, on-site decryption begins. However, further exploration of this aspect is beyond the scope of this analysis.

## Scripting

To replicate the decryption function, we need to focus on the key steps of the process:

1. The encrypted data is processed in 4-byte blocks.
2. The decryption involves subtracting the 4-byte encrypted block by the 4-byte key, then adding the 4 bytes from the previous encrypted block (if applicable).
3. The destination address is incremented by 4 bytes, and the remaining size (fourth parameter) is decremented accordingly.
4. This process continues iteratively until all encrypted data has been decrypted.

Translated into Python, the process looks like this:

```python
for index in range(0, len(data), 4):
    curr_dword = struct.unpack("<I", data[index:index + 4])[0]
    dec_bss += struct.pack("I", (curr_dword + (prev_dword - key)) & 0xffffffff)
    dec_bss += struct.pack("I", 0x0)
```

The complete code has been released, but special attention should be given to the key creation process. This is crucial because `IdleTime` varies with each execution, which in turn causes the "magic_argument" to change.
To address this variability, the "magic_argument" can be brute-forced (as it is limited to a value between 0 and 20) during the decryption process.
The correct key, and consequently the successful decryption, can be identified by checking for the presence of the string "NTDLL" within the decrypted code.
This string serves as an indicator of a correctly applied decryption process.

In Python:

```python
for random in range(0, 20):
    key = get_key(date, bss_va, random)
    decrypted_bss = decrypt(bss_data, key)
    if b"NTDLL" in decrypted_bss:
        print("Correct Key: " + hex(key))
        break
```

Again, the complete solution script can be found on my [GitHub](https://github.com/f4ncyz4nz4/mre_scripts/blob/main/gozi_string_decryption/decrypt.py)
