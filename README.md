# Vulnerable Web App - Beginners

## Usage

#### Web app only
```
npm install
npm start
```

#### Full docker build (Includes Linux backend)
```
docker build -t vulnerable-web-app .

docker run -p 8080:8080 vulnerable-web-app
```
\
Then navigate to http://0.0.0.0:8080/

## About

This is an intentionally vulnerable web application, *duh*.


#### Features:
* Login page vulnerable to SQL injection - works well with sqlmap
* Upload page where reverse shells (or other files) may be uploaded for Remote Code Execution
* Privilege escalation on the Linux backend (still undecided on the best way to do this)

## Current Solution
1. Access login via http://0.0.0.0:8080/
2. SQLi - `admin' or '1'='1` into username and password
3. Upload reverse shell (example can be found in `app/uploads/shell.sh`)
4. Listen with `nc -lvnp 9001`
5. Navigate to http://0.0.0.0:8080/uploads/shell.sh
6. WIP - Currently vim has the SUID bit set for root, so privilege escalation can be performed from there. (Need a better way of doing this, the shell obtained is very ugly and not easily upgradeable to a full shell.)

## Goal

The goal of this project is to provide a beginner friendly, fun-to-solve, open source, intentionally vulnerable application.
The process of solving the challenge should allow for penetration testing tools to be easily motivated and introduced.

The top tools that I would like to be used while completing this are:
* Nmap
* Netcat
* Burp Suite
* sqlmap
* Gobuster/wfuzz or similar
* John the Ripper/Hashcat
* LinEnum or similar

At the moment inspiration has been heavily derived from [this specific challenge](https://www.billycody.com/guides/crikeycon-2019-free-ticket-challenge) (which is unfortunately not open source and not available anymore).\
I personally found that ctf to be very fun to solve and quite beginner friendly.

I would like for it to function as a standalone host/box with a Linux backend.\
Ultimately access may be gained from the web app and then the user can then move onto compromising the linux host itself.

This will be used as a tool when introducing penetration testing.

My initial idea was:
1. Discover web-app via `Nmap`
2. Perform directory enumeration to discover login page using `Gobuster`
3. Achieve SQL Injection (either manually or via `sqlmap`) to either login or obtain hashed password
4. If hashes were obtained, use `John` or `Hashcat` to crack them and then login
5. Upload and execute reverse shell using `Netcat`
6. Perform local privilege using `LinEnum` to obtain root

## Why Docker?

Honestly, this may not be the best option, however it's the best way that I can think of to host the Linux backend at the moment.\
If you have a better idea, please let me know!

## Contributions

I appreciate any contributions to this project.\
Please open a pull request or contact me if you have any ideas or changes.
