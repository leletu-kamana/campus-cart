# Contributing to Campus-Cart

Thank you for considering a contribution to Campus-Cart. Contributions such as bug reports, accessibility improvements, documentation updates and tested code changes are welcome.

Please read the [Code of Conduct](CODE_OF_CONDUCT.md) before participating.

## Project Overview

Campus-Cart is a multi-page student website project built with:

- HTML5 for page structure.
- CSS3 for layout, styling and responsive behaviour.
- Vanilla JavaScript for browser-side interactions.
- Relative paths for local project assets and page navigation.

The project is intentionally kept lightweight. Do not introduce a frontend framework, build system or dependency unless the maintainer has discussed and approved the change.

## Before You Start

1. Check the existing issues and pull requests to see whether the work is already being discussed.
2. For a significant change, open an issue first to explain the problem and proposed solution.
3. Keep changes focused. Avoid unrelated formatting, renaming or redesign work in the same contribution.
4. Do not commit passwords, API keys, access tokens, private user information or other secrets.

## Development Guidelines

- Preserve the existing multi-page HTML structure.
- Keep CSS in the existing external stylesheet and JavaScript in the appropriate files under `assets/js/`.
- Use semantic HTML and accessible labels, names and keyboard interactions.
- Maintain the established Campus-Cart design palette and responsive layouts unless the issue requires a design change.
- Use relative asset paths where appropriate so pages work in the repository and deployed site.
- Avoid unnecessary dependencies and duplicated code.
- Do not remove existing functionality simply to make a change easier.
- Keep comments accurate and update relevant documentation when behaviour or project structure changes.
- Respect the licences and attribution notices for third-party assets and libraries.

## Reporting a Bug

When opening an issue, include:

- A clear and descriptive title.
- The page and feature affected.
- Steps to reproduce the problem.
- What you expected to happen.
- What actually happened.
- Your browser, operating system and device type, where relevant.
- Screenshots or console errors, if they help explain the issue. Remove personal information and secrets before sharing.

## Proposing a Change

1. Fork the repository.
2. Create a focused branch from the current default branch.
3. Make the smallest practical change that addresses the issue.
4. Review your diff for unrelated changes, debug statements and accidental secrets.
5. Test the affected page or feature before submitting.
6. Push your branch and open a pull request.

Use a descriptive branch name, for example:

- `fix/mobile-navigation`
- `feature/accessibility-improvements`
- `docs/update-setup-guide`

## Testing Checklist

Before submitting, check the following where applicable:

- The affected HTML page loads without broken markup or missing assets.
- Navigation links and relative paths work.
- JavaScript features work and the browser console has no new errors.
- Forms provide appropriate validation and feedback.
- Layouts remain usable on desktop, tablet and mobile widths.
- Keyboard navigation and visible focus states work.
- Images have appropriate alternative text.
- Existing pages and shared components have not regressed.

If you cannot test a particular browser, device or feature, state that clearly in the pull request. Do not claim tests that were not performed.

## Pull Request Guidelines

A pull request should include:

- A concise summary of the change.
- The issue it addresses, if applicable.
- The main files or pages changed.
- Tests performed and their results.
- Known limitations or follow-up work.

Keep pull requests focused and respond constructively to review feedback. A maintainer may request changes before merging.

## Documentation Changes

Update relevant files in `docs/` when a contribution changes project structure, setup, testing, image usage or design conventions. Keep documentation consistent with the current implementation.

## Licence

By submitting a contribution, you agree that your contribution may be distributed under the repository's [GNU General Public License v3.0](../LICENSE), subject to your rights to the contribution and any applicable third-party licences. Do not submit material that you do not have the right to contribute.
