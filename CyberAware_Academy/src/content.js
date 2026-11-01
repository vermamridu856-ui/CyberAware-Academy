export const lessons = [
 {id:'phishing',icon:'✉',title:'Spot Phishing',time:'8 min',intro:'Learn how to recognize deceptive messages, links, attachments, and impersonation attempts before they lead to account compromise.',points:[
 'Understand the trick: phishing is an attempt to obtain passwords, financial details, or access by pretending to be a trusted organization or person.',
 'Inspect the actual domain, not just the company logo or sender display name. For example, accounts.example.com is different from accounts-example.com.',
 'Watch for pressure tactics: "act within 10 minutes", threats, prize announcements, or requests to keep a transaction secret.',
 'Treat unexpected attachments, QR codes, shortened links, and requests to sign in as reasons to verify independently.',
 'Never enter credentials after following an unexpected link. Open the official app or type the verified website address yourself.',
 'Report suspicious messages using your organization\'s reporting process. If you already clicked, change affected credentials and contact support promptly.'
 ],scenario:'A message says: "Your university account expires today. Verify immediately using this shortened link." It includes the university logo and a familiar name.',answer:'Do not use the link. Visit your university\'s official website or contact its IT helpdesk through a known channel. Report the message.'},
 {id:'passwords',icon:'🔑',title:'Passwords & MFA',time:'8 min',intro:'Protect accounts with unique passphrases, password managers, and effective multifactor authentication.',points:[
 'Use a different password for every important account so that one exposed password cannot unlock your other accounts.',
 'Long passwords or passphrases are harder to guess. Avoid names, birthdays, common phrases, and predictable substitutions such as P@ssw0rd.',
 'Use a reputable password manager to create, store, and autofill long random passwords instead of relying on memory.',
 'Enable MFA on email, banking, cloud, and social media accounts. Authenticator apps or security keys are preferable where available.',
 'Never share an OTP, push approval, backup code, or recovery link—even with someone claiming to be support staff.',
 'If a password is exposed, change it on that service and anywhere you reused it; review sessions and recovery settings.'
 ],scenario:'You receive an MFA push notification while you are not logging in. Seconds later someone calls claiming to be IT and asks you to approve it.',answer:'Deny the request and report it. Someone may know your password and be attempting to access your account.'},
 {id:'browsing',icon:'🌐',title:'Safer Browsing',time:'7 min',intro:'Learn how to judge websites, downloads, browser permissions, and everyday device risks.',points:[
 'HTTPS encrypts the connection but does not guarantee a website is authentic; scammers can obtain HTTPS certificates too.',
 'Check the exact website address before signing in or paying. Be cautious of lookalike spellings, extra words, and misleading subdomains.',
 'Download software only from trusted official sources, and avoid installing unexpected browser extensions or remote-access tools.',
 'Keep your operating system, browser, and applications updated to reduce exposure to known security vulnerabilities.',
 'Be cautious on shared computers. Sign out of sensitive accounts, avoid saving credentials, and lock your device when you step away.',
 'Back up important files and review permission requests. A website asking for notifications, camera, or location access should have a clear reason.'
 ],scenario:'You find a heavily discounted electronics website with a padlock icon, but the domain is a misspelled version of a well-known store.',answer:'Do not assume the padlock means the seller is genuine. Independently verify the domain, business identity, and seller reputation.'},
 {id:'social',icon:'📱',title:'Social Engineering',time:'8 min',intro:'Spot manipulation through authority, urgency, trust, fear, curiosity, and artificial intelligence impersonation.',points:[
 'Social engineering targets human decisions rather than only technical vulnerabilities. Attackers may impersonate colleagues, officials, or family members.',
 'Common tactics include pretexting (a fabricated story), baiting (a tempting offer), and impersonating technical support.',
 'A convincing voice, profile photo, or video is not proof of identity. AI-generated voice and video can be used in scams.',
 'Verify unusual requests through a second trusted channel, especially for transfers, password resets, gift cards, or sensitive files.',
 'Avoid revealing student IDs, personal documents, routine schedules, and other sensitive details unnecessarily on public platforms.',
 'If an unusual request creates panic or demands secrecy, pause, independently verify, and ask a trusted person or security contact for help.'
 ],scenario:'Someone claiming to be your department head urgently messages you from a new number asking for student records and says not to call.',answer:'Contact the department head using the official number or another previously verified channel before sharing anything.'}
];
export const questions = [
 {id:1,category:'Phishing',prompt:'An unexpected email asks you to urgently reset your bank password via a link. Best response?',options:['Click immediately','Open your bank website independently','Reply with your password','Forward to everyone'],correct:1,explanation:'Always verify alerts through the official app or a trusted address.'},
 {id:2,category:'Passwords',prompt:'Which password practice is the safest?',options:['Reuse one password everywhere','Use a long, unique password for each account','Share passwords over chat','Use your birthday'],correct:1,explanation:'Unique passwords help prevent credential-stuffing after a breach.'},
 {id:3,category:'MFA',prompt:'A caller asks you to read out a one-time verification code. What should you do?',options:['Read it out','Post it in a group','Never disclose it','Send it by email'],correct:2,explanation:'Verification codes are authentication secrets.'},
 {id:4,category:'Browsing',prompt:'A website uses HTTPS. Does this guarantee the website is legitimate?',options:['Yes, always','Only on mobile','No; phishing sites can also use HTTPS','Only at night'],correct:2,explanation:'HTTPS encrypts the connection; it does not independently prove legitimacy.'},
 {id:5,category:'Social Engineering',prompt:'A stranger claiming to be IT support demands remote access immediately. Best action?',options:['Install their tool','Verify with official IT support','Give them your login','Ignore company policy'],correct:1,explanation:'Independently confirm unexpected support requests.'},
 {id:6,category:'Phishing',prompt:'Which is a warning sign of phishing?',options:['Unexpected urgency and a strange domain','Correct spelling','A company logo','An email received in daytime'],correct:0,explanation:'Pressure and domain impersonation commonly appear in phishing attempts.'},
 {id:7,category:'Device Safety',prompt:'Why install security updates?',options:['To change your wallpaper','To fix known software vulnerabilities','To increase spam','To remove backups'],correct:1,explanation:'Updates can patch flaws that attackers could exploit.'},
 {id:8,category:'Passwords',prompt:'Which account-security tool can generate and store unique passwords?',options:['Calculator','Password manager','Screenshot editor','Media player'],correct:1,explanation:'Password managers help avoid password reuse.'},
 {id:9,category:'Privacy',prompt:'What is safer before sharing a personal document online?',options:['Post publicly','Review recipients and remove unnecessary personal details','Disable all security','Use any unknown link'],correct:1,explanation:'Data minimization reduces unnecessary exposure.'},
 {id:10,category:'Phishing',prompt:'You receive an unexpected attachment from a familiar-looking name. What matters most?',options:['The sender avatar','The attachment size','Verifying the actual sender and context','The font color'],correct:2,explanation:'A familiar display name can be spoofed.'}
];
