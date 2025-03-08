# Oski Stealer String Decryption

The **Oski Stealer String Decryption** challenge, part of the [Zero2Automated](https://courses.zero2auto.com/) series, involves reverse engineering the string decryption routine from a **Oski Stealer** sample and developing a script to automate the decryption process.
The provided sample is identified by the hash `707adf85c61f5029e14aa27791010f2959e70c0fee182fe968d2eb7f2991797b`.

The complete solution script can be found on my [GitHub](https://github.com/f4ncyz4nz4/mre_scripts/blob/main/oski_stealer_string_decryption/oski_decrypt.py).

## Unpacking

To begin our analysis, we examine the sample using **PEStudio** to determine its characteristics. It is immediately clear that this is a **32-bit .NET executable**, and its high entropy suggests that it is **packed**.

![DIE Entropy section](/posts/oski_stealer_string_decryption/images/die.png "DIE Entropy section")

Next, we proceed with [dnSpy](https://dnspy.org/) for further inspection. We quickly notice a call to the function `ttJiDM`, which, however, does not reveal any code. Additionally, a new instance of the `gc` class is created, leading us to the main function.

The constructor of the `gc` class contains multiple lines of code, but our attention is drawn to the `Invoke` method, which, in the context of .NET unpacking, is analogous to `VirtualAlloc` and `VirtualProtect` API calls for normal executables.

Through dynamic analysis, we can determine which method is actually invoked. In particular, lines 34 and 35 are of primary interest.

![gc constructor](/posts/oski_stealer_string_decryption/images/gc_function.png "gc constructor")

At line 34, it is likely that the function loads an assembly file, from which it retrieves the method of interest. This method is later invoked at line 49.

The function `D5d` plays a crucial role in retrieving an array from the `BayesMe` object, which is stored in the file’s resources. This array is then decoded into a .NET assembly, which is dynamically loaded by the function itself.

Through runtime inspection, we can confirm that the method identified at line 35 is `EhgUZIvRw`, which is soon invoked. Next, we proceed with its analysis.

### FuncAttribute.dll module

The static method `EhgUZIvRw` belongs to a different .NET module than the previous one, specifically named `FuncAttribute.dll`, as shown in the image below.

![FuncAttribute.dll module](/posts/oski_stealer_string_decryption/images/funcattribute.dll_module.png "FuncAttribute.dll module")

Similar to the previous module, both functions and classes have obfuscated names, making it difficult to determine their purpose at a glance. The most effective approach is to toggle breakpoints on the `UnsafeInvokeInternal` function, which is part of the mscorlib module. This allows us to monitor every call to `Invoke` along with its parameters. It is likely that the unpacked version of the Oski stealer will be dropped through this function.

![UnsafeInvokeInternal function](/posts/oski_stealer_string_decryption/images/unsafeinvokeinternal.png "UnsafeInvokeInternal function")

A quick inspection of the function reveals a call to `Thread.Sleep` for 45733 milliseconds (approximately 45 seconds), during which the main process enters a standby state.

After this prolonged delay, we observe an array being retrieved, converted into an assembly object, and subsequently invoked at line 52 within an internal function named `UJOdcJrJaxN058mJyX`.

![Sleep function](/posts/oski_stealer_string_decryption/images/sleep.png "Sleep function")

Could this be the unpacked Oski stealer?

### DotNetZipAdditionalPlatforms.dll module

As seen previously, the static method being invoked is fQRwCeWyVS, which belongs to yet another .NET module, named DotNetZipAdditionalPlatforms.dll, as shown in the image below.

![DotNetZipAdditionalPlatforms.dll module](/posts/oski_stealer_string_decryption/images/dotnetzipadditionalplatforms.png "DotNetZipAdditionalPlatforms.dll module")

At this stage of the challenge, our primary goal is to extract the Oski Stealer payload, so we will not conduct a deep analysis of these additional modules. However, it is important to note that among other actions, a scheduled process is created with the purpose of executing a .NET executable located at `AppData\Roaming\cYcPaAiPYUC.exe`.

This scheduled script is created via the Windows Task Scheduler, using an XML configuration file, as shown below.

![XML configuration](/posts/oski_stealer_string_decryption/images/xml_file.png "XML configuration")

Continuing the analysis with a breakpoint on the `UnsafeInvokeInternal` function, we observe two key method invocations:

- `Assembly.Load`
- `GetRuntimeDirectory`

ùUpon inspecting the first call, nothing particularly interesting is found—an array of size `0x71400` is loaded, but it turns out to be another .NET module, while we know that Oski is written in C++.

The second call, however, leads to a new function of interest: `evIlDKwwfOqtAVPasvA.veMSOMDjV`.

This function stands out because one of its arguments contains the name of the executable under analysis, along with an array of size `0x32000`.

![Suspicious array](/posts/oski_stealer_string_decryption/images/suspicious_array.png "Suspicious array")

If this array represents a PE executable, and given the name of the file, it is highly likely that the malware employs a **self-injection** technique.

![Extracted PE](/posts/oski_stealer_string_decryption/images/pestudio.png "Extracted PE")

Heureka! The extracted file is a C++ executable, confirming that this is indeed the **Oski Stealer payload**. Now, it's time to analyze the actual loader.

## Analysis

When analyzing the executable, it is easy to identify typical initial functions found in Windows executables. The actual `main` function is identified as `FUN_00421400`, which is notably short.

![main function](/posts/oski_stealer_string_decryption/images/main.png "main function")

At this stage, no encoded strings have been identified yet. However, they can be easily found using the `strings` command or by inspecting the `.data` section of the executable and examining all cross-references present in the code.

To achieve this, I opened the first function, `FUN_00423050`, which, when analyzed using Ghidra, provided all the necessary information.

![Encrypted strings](/posts/oski_stealer_string_decryption/images/encrypted_strings.png "Encrypted strings")

Upon first inspection, several crucial observations can be made:

The string `056139954853430408` stands out and will be analyzed later.

A possible domain, `alazlfa.cf`, which may serve as the malware's Command-and-Control (C2) server. This domain appears to be well-documented on VirusTotal.

![C2](/posts/oski_stealer_string_decryption/images/alazlfa.cf.png "C2")

A set of base64-encoded strings, all passed to a single function, `FUN_00422f70`, which has been renamed `decrypt` due to its probable role in decryption.

### Function FUN_00422f70

The function is structured as shown in the following image. Several variables and functions have been renamed for clarity and better readability.

![decrypt function](/posts/oski_stealer_string_decryption/images/decrypt.png "decrypt function")

The only parameter passed to this function is the encrypted, base64-encoded string.

The `basic_string<>` function is notable as it takes a pointer and a character array as parameters, likely transferring the string into the array for byte-wise decryption.

The same function is called again with another hardcoded string from the `.data` section — `056139954853430408`. This strongly suggests that it serves as a decryption key.

Moving forward, the next function encountered is `FUN_00422d00`. There are several techniques to confirm that this is a base64 decoding function. The quickest and most effective method in this case was dynamic analysis—after execution and inspection of the first parameter (a pointer), the decoded bytes were identified.

This is followed by a deallocation function, which is easily recognized with the aid of Ghidra.

![deallocating function](/posts/oski_stealer_string_decryption/images/deallocate.png "deallocating function")

Next, there is a function for calculating string length, followed by two highly recognizable functions: `GetProcessHeap` and `HeapAlloc`, both used for string manipulation and decryption.

The last step in this process involves `FUN_00422980`, which is responsible for executing the actual decryption. Let’s analyze it further.

### Function FUN_00422980

Understanding this function took considerable effort. Eventually, it became clear that it implements the `RC4 algorithm`. This was primarily deduced from the presence of two constants `0x256`, a common characteristic of RC4, and the realization that the code structure aligned with a standard encryption algorithm.

Verifying this hypothesis was straightforward—by inputting a test string into CyberChef, as demonstrated in the following image:

![CyberChef](/posts/oski_stealer_string_decryption/images/cyberchef.png "CyberChef")

The analysis has been successfully completed. We have identified the encoded strings and the method used to decrypt them. The next step is to automate this process to streamline further investigations.

### RC4 Algorithm

RC4 (Rivest Cipher 4) is a stream cipher that encrypts data by generating a pseudo-random keystream, which is then XORed with the plaintext to produce the ciphertext. The same process is used for decryption—XORing the ciphertext with the same keystream restores the original data.

The algorithm works in two main steps:

1. Key Scheduling Algorithm (KSA) – Initializes a permutation of bytes (S-Box) based on the provided key.
2. Pseudo-Random Generation Algorithm (PRGA) – Continuously generates a stream of pseudo-random bytes, which are XORed with the input data for encryption or decryption.

Since RC4 is symmetric, the same function is used for both encrypting and decrypting.

## Scripting

The decryption process automation was carried out using [PyGhidra](https://github.com/NationalSecurityAgency/ghidra/blob/master/Ghidra/Features/PyGhidra/src/main/py/README.md), a Python library that provides direct access to the [Ghidra API](http://hwreblog.com/9.1/api/ghidra/program/flatapi/FlatProgramAPI.html#).

Since all encrypted strings are passed to the decryption function just before the function call, the logical steps to automate the process are as follows:

1. Locate the decrypt function (`FUN_00422f70`) and get all the all cross-references

```python
decrypt_func_addr = flat_api.toAddr(addr)

for ref in reference_manager.getReferencesTo(decrypt_func_addr):
    from_ref = ref.getFromAddress()
```

2. Get the instructions before (always a `PUSH`)

```python
push_instr = flat_api.getInstructionBefore(from_ref)
```

3. Extract the addresses that the encrypted strings are located at

```python
start_b64_str = flat_api.toAddr(push_instr.getOpObjects(0)[0].toString())
```

4. Read and decrypt those bytes

To decrypt the extracted data, an RC4 decryption algorithm is required. The implementation used in this process is based on the code from [hsauers5](https://gist.github.com/hsauers5/491f9dde975f1eaa97103427eda50071)—cheers! 🍻

Once the script is correctly configured and executed, the output should resemble the following:

![Decrypted strings](/posts/oski_stealer_string_decryption/images/decrypted_string.png "Decrypted strings")

The complete solution script can be found on my [GitHub](https://github.com/f4ncyz4nz4/mre_scripts/blob/main/oski_stealer_string_decryption/oski_decrypt.py).
