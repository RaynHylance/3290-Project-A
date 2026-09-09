# Contributing to Expedia Clone

Thank you for contributing to the Expedia Clone project.

## Development Setup

1. Clone the repository.
2. Run npm install.
3. Start JSON Server with npm run server.
4. Start React with npm start.
5. Make changes on a separate Git branch.

## Branch Naming

Use descriptive branch names such as:

- feature/cart-page
- feature/package-search
- fix/hotel-filter
- docs/readme-update

## Commit Messages

Use short, descriptive commit messages.

Examples:

- Add holiday package search
- Fix hotel pagination
- Update local setup documentation

## Before Submitting Changes

Verify that:

- The React application starts successfully.
- JSON Server runs on port 8080.
- npm run build completes successfully.
- Existing hotel and flight workflows still work.
- Personal test data is not committed to db.json.
- New functionality has been manually tested.

## Pull Requests

Pull requests should:

- Describe what changed.
- Explain why the change was needed.
- Mention how it was tested.
- Avoid unrelated changes.

## Code Style

Prefer:

- Clear component names
- Small reusable components
- Consistent formatting
- Descriptive variables
- Error handling for API requests