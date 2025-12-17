# ZenkariApp - Messagerie Sécurisée

![ZenkariApp Logo](Zenkari.ico)

**ZenkariApp** est une application de messagerie sécurisée avec chiffrement de bout en bout utilisant RSA-4096 et AES-256.

## 📋 Table des matières

- [Fonctionnalités](#-fonctionnalités)
- [Technologies](#-technologies)
- [Installation](#-installation)
- [Configuration](#-configuration)
- [Utilisation](#-utilisation)
- [Sécurité](#-sécurité)
- [Contribution](#-contribution)
- [Licence](#-licence)

## 🔧 Fonctionnalités

✅ **Chiffrement de bout en bout** avec RSA-4096 + AES-256
✅ **Signature numérique** des messages
✅ **Gestion des contacts** avec échange de clés publiques
✅ **Protection par clé de sécurité** optionnelle
✅ **Journalisation** complète des activités
✅ **Génération de QR codes** pour l'échange de clés
✅ **Interface intuitive** avec onglets
✅ **Stockage local** des données utilisateur

## 💻 Technologies

- **Frontend**: HTML5, CSS3, JavaScript
- **Backend**: Python (Flask/Django )
- **Chiffrement**: PyCryptodome (RSA-4096, AES-256, SHA-256)
- **Base de données**: SQLite 
- **QR Codes**: qrcode et Pillow

## 🚀 Installation

### Prérequis

- Python 3.8+
- Node.js (pour le frontend si vous utilisez un framework JS)
- pip (gestionnaire de paquets Python)

### Étapes

1. Cloner le dépôt :
   ```bash
   git clone https://github.com/votre-utilisateur/zenkari-app-web.git
   cd zenkari-app-web
