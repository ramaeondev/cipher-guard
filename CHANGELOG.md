# Changelog

All notable changes to the CipherGuard project will be documented in this file.

## [2.0.0] - 2025-02-17

### Added
- Implemented comprehensive encryption/decryption methods:
  - AES encryption
  - DES encryption
  - 3DES encryption
  - Rabbit encryption
  - RC4 encryption
- Added multiple hashing algorithms:
  - MD5 hashing
  - SHA-1 hashing
  - SHA-256 hashing
  - SHA-512 hashing
  - HMAC-SHA256 hashing
- Integrated build information service to track version and build dates
- Added clipboard functionality for encrypted/decrypted text
- Implemented snackbar notifications for user feedback
- Added input validation for encryption/decryption operations

### Changed
- Migrated to Angular signals for state management
- Updated to modern Angular Material UI components
- Improved error handling for decryption operations
- Enhanced UI/UX with better feedback messages

### Technical
- Configured GitHub Actions pipeline for automated deployment
- Added dual deployment support for GitHub Pages and Vercel
- Implemented Node.js v20 for build process
- Added automated build and deployment workflow
- Updated build configuration for GitHub Pages compatibility

### Security
- Implemented proper error handling for invalid decryption keys
- Added validation checks for required inputs
- Improved feedback for encryption/decryption failures

### Developer Experience
- Added comprehensive build pipeline configuration
- Implemented automated deployment process
- Added support for manual workflow triggers
