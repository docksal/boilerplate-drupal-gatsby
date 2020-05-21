# Decoupled Drupal 8 with GatsbyJS Frontend

A decoupled setup with Drupal 8 CMS and Gatsby frontend.

Features:

- Drupal 8 installed with Umami demo profile
- Gatsby frontend for Umami
- Gatsby Preview (instant content updates in frontend, locally)
- Example of using Paragraphs Drupal module with Gatsby
- Custom Docksal commands to automate routine tasks

![drupal-gatsby-preview](https://user-images.githubusercontent.com/1205005/82586762-f3e65600-9b4c-11ea-9f42-9d131c6f4567.gif)

## Setup instructions

1. [Install Docksal](https://docs.docksal.io/getting-started/)

2. In your "Projects" directory run

    ```
    fin project create --name=drupal-gatsby --repo=https://github.com/docksal/boilerplate-drupal-gatsby.git
    cd drupal-gatsby
    ```

If you fork/clone from here, then just run `fin init` inside the cloned repo folder. 

You will get a lit of URLs at the end of the init process:

```
$ fin init
...
Drupal CMS:     http://cms-drupal-gatsby.docksal
Preview server: http://preview-drupal-gatsby.docksal
Frontend build: http://drupal-gatsby.docksal (run 'fin fe/build')
```

Note: Preview server (running `gatsby develop`) takes some time to initialize. Wait a minute then reload the page.

## Custom Commands

To list custom commands, run `fin` in the project repo and see the list at the bottom of the output, e.g:

```
$ fin
...
Custom commands:
  cms/code-init                 Initialize CMS codebase
  cms/install                   Initialize/reinstall CMS
  cms/uli                       Watch preview logs
  fe/build                      Build frontend (static website)
  fe/code-init                  Initialize frontend codebase
  fe/logs                       Watch preview logs
  init                          Initialize project from scratch (full reset)
```

These commands are stored in `.docksal/commands/` and can be used to automate and run routine tasks.

## Tips and Tricks

- Use `fin bash` to get a terminal with all developer tools pre-installed
  - **Use this instead of your local console**
  - You can run `composer`, `drush`, `npm`, etc. without the need to install those tools locally
- Use `fin composer` inside the `cms` folder to manage Composer dependencies  
- Use `fin drush` inside the `cms` folder manage Drupal CMS via Drush
- Use `fin cms/uli` (`fin drush uli`) to get a one-time admin login link for Drupal CMS
- Use `fin fe/logs` (`fin logs -f preview`) to watch preview (`gatsby develop`) logs
- Enable VS Code Web IDE with `fin config set --env=local IDE_ENABLED=1; fin project start` ([Learn more](https://docs.docksal.io/tools/ide/))

Docksal documentation - [https://docs.docksal.io/](https://docs.docksal.io/)
