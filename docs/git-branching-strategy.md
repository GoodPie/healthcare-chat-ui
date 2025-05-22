# Git Branching Strategy for Healthcare Chat UI Library

## Overview

This project uses the **GitFlow branching strategy** to ensure a stable, scalable, and collaborative development workflow. GitFlow is ideal for projects that require parallel feature development, hotfixes, and clear release management.

---

## Why GitFlow?
- **Separation of Concerns:** Keeps production, development, and feature work isolated.
- **Parallel Development:** Multiple features and fixes can be developed simultaneously.
- **Release Management:** Supports hotfixes and releases without disrupting ongoing work.
- **Stability:** Ensures `main` is always production-ready, and `develop` is always integration-ready.

---

## Branch Types

- **main**: Always production-ready. Only stable, released code lives here.
- **develop**: Integration branch for features and fixes. All development merges here before release.
- **staging**: (Optional, but recommended for QA) Pre-release testing branch.
- **feature/*:** For new features. Branch off from `develop`.
- **hotfix/*:** For urgent production fixes. Branch off from `main`.
- **release/*:** For prepping a new release. Branch off from `develop`.

---

## Initializing the Strategy

You already have a `main` branch. To set up the rest:

```sh
# Create and switch to develop
git checkout -b develop main

# (Optional) Create staging from develop
git checkout -b staging develop

# Push branches to remote
git push -u origin develop
git push -u origin staging
```

For new features:
```sh
git checkout -b feature/your-feature-name develop
```

For hotfixes:
```sh
git checkout -b hotfix/critical-fix main
```

For releases:
```sh
git checkout -b release/v1.0.0 develop
```

---

## Best Practices
- Only merge to `main` via Pull Requests from `develop`, `release/*`, or `hotfix/*`.
- Keep `develop` as the default branch for day-to-day work.
- Use descriptive branch names (e.g., `feature/theme-switcher`).
- Regularly merge `develop` into feature branches to keep them up to date.
- Use `staging` for QA and pre-release validation.
- Protect `main` and `develop` branches in your repository settings.

---

## References
- [Engati: Best Git Branching Strategies](https://www.engati.com/blog/git-branching-strategies)
- [Open edX: How to Add Documentation via GitHub](https://docs.openedx.org/en/latest/documentors/how-tos/add_a_doc_via_github.html)

---

## Contributing

When contributing, always branch from `develop` (for features) or `main` (for hotfixes). Submit Pull Requests to the appropriate branch and ensure your code is tested and documented.

For documentation changes, see [How to Add Documentation via GitHub](https://docs.openedx.org/en/latest/documentors/how-tos/add_a_doc_via_github.html). 