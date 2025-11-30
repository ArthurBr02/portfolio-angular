# Configuration de l'envoi d'emails

Ce document explique comment configurer l'envoi d'emails pour le formulaire de contact du portfolio.

## Prérequis

Le système utilise **nodemailer** pour l'envoi d'emails via SMTP. Vous devez avoir accès à un serveur SMTP (Gmail, Outlook, serveur personnalisé, etc.).

## Configuration

### 1. Copier le fichier d'exemple

Copiez le fichier `.env.example` vers `.env` :

```bash
cp .env.example .env
```

### 2. Configurer les variables d'environnement

Éditez le fichier `.env` et configurez les variables suivantes :

```env
# Configuration Email (SMTP)
SMTP_HOST=smtp.gmail.com          # Serveur SMTP
SMTP_PORT=587                      # Port SMTP (587 pour TLS, 465 pour SSL)
SMTP_SECURE=false                  # true pour port 465, false pour les autres
SMTP_USER=votre-email@gmail.com   # Votre adresse email
SMTP_PASS=votre-mot-de-passe-app  # Mot de passe d'application
EMAIL_FROM=votre-email@gmail.com  # Email expéditeur
EMAIL_TO=votre-email@gmail.com    # Email destinataire (où recevoir les messages)
```

## Configuration par fournisseur

### Gmail

1. **Activer l'authentification à deux facteurs** sur votre compte Google
2. **Générer un mot de passe d'application** :
   - Allez sur https://myaccount.google.com/security
   - Cliquez sur "Mots de passe des applications"
   - Sélectionnez "Autre" et donnez un nom (ex: "Portfolio Contact Form")
   - Copiez le mot de passe généré (16 caractères)

3. **Configuration** :
```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=votre-email@gmail.com
SMTP_PASS=xxxx xxxx xxxx xxxx  # Mot de passe d'application (sans espaces)
EMAIL_FROM=votre-email@gmail.com
EMAIL_TO=votre-email@gmail.com
```

### Outlook / Hotmail

```env
SMTP_HOST=smtp-mail.outlook.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=votre-email@outlook.com
SMTP_PASS=votre-mot-de-passe
EMAIL_FROM=votre-email@outlook.com
EMAIL_TO=votre-email@outlook.com
```

### Yahoo Mail

```env
SMTP_HOST=smtp.mail.yahoo.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=votre-email@yahoo.com
SMTP_PASS=votre-mot-de-passe-app
EMAIL_FROM=votre-email@yahoo.com
EMAIL_TO=votre-email@yahoo.com
```

### Serveur SMTP personnalisé

```env
SMTP_HOST=mail.votre-domaine.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=contact@votre-domaine.com
SMTP_PASS=votre-mot-de-passe
EMAIL_FROM=contact@votre-domaine.com
EMAIL_TO=admin@votre-domaine.com
```

## Test de la configuration

Pour tester que l'envoi d'emails fonctionne correctement :

1. Démarrez le serveur backend :
```bash
cd backend
npm run dev
```

2. Remplissez le formulaire de contact sur votre site

3. Vérifiez :
   - Les logs du serveur pour voir si l'email a été envoyé
   - Votre boîte de réception (EMAIL_TO) pour recevoir le message

## Dépannage

### Erreur "Invalid login"
- Vérifiez que SMTP_USER et SMTP_PASS sont corrects
- Pour Gmail, assurez-vous d'utiliser un mot de passe d'application, pas votre mot de passe principal
- Vérifiez que l'authentification à deux facteurs est activée (Gmail)

### Erreur "Connection timeout"
- Vérifiez que SMTP_HOST et SMTP_PORT sont corrects
- Vérifiez que votre pare-feu n'bloque pas le port SMTP
- Essayez avec SMTP_SECURE=true et SMTP_PORT=465

### L'email n'arrive pas
- Vérifiez vos spams/courrier indésirable
- Vérifiez que EMAIL_TO est correct
- Consultez les logs du serveur pour voir les erreurs

## Format de l'email reçu

Lorsqu'un visiteur envoie un message via le formulaire de contact, vous recevrez un email avec :

- **Sujet** : "Portfolio Contact Form: Message from [Nom]"
- **De** : Votre adresse configurée (EMAIL_FROM)
- **Répondre à** : L'adresse email du visiteur
- **Contenu** : 
  - Nom du visiteur
  - Email du visiteur
  - Message

L'email est formaté en HTML pour une meilleure lisibilité.

## Sécurité

⚠️ **Important** :
- Ne commitez JAMAIS le fichier `.env` dans Git
- Le fichier `.env` est déjà dans `.gitignore`
- Utilisez des mots de passe d'application, pas vos mots de passe principaux
- Changez régulièrement vos mots de passe d'application

## Support

Pour plus d'informations sur nodemailer : https://nodemailer.com/
