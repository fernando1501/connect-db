# GUÍA DE CONTRIBUCIÓN

## Cómo contribuir

Este proyecto utiliza la librería [Changesets](https://github.com/changesets/changesets/tree/main) para gestionar las versiones y publicaciones de la librería.

### Pasos para contribuir:

#### Prerequisitos:

- Node.js 20
- pnpm 8

1. Ejecuta `pnpm install` para instalar las dependencias.

2. Crea un branch con un nombre descriptivo de tu contribución.

3. Realiza tus cambios en el código.

4. Antes de ejecutar `git push`, si tu contribución cambia la librería de alguna manera que requiera la publicación de una nueva versión, ejecuta `pnpm changeset` y sigue las instrucciones en el la terminal.

5. Haz un PR a la branch `main` del repositorio.

### Uso de Changesets

Los Changesets nos ayudan a gestionar las versiones de la librería de manera semántica y automática.

- **Generar un Changeset**: Después de hacer tus cambios, ejecuta `pnpm changeset`. Selecciona el tipo de cambio (major, minor, patch) y escribe un mensaje breve que describa tu contribución.

- **Revisión y merge**: Cuando se hace merge de tus cambios a `main`, un GitHub Action correrá automáticamente y generará un nuevo PR haciendo el bump de la versión de la librería (`"version"` en `package.json`), además de generar o modificar el archivo `CHANGELOG.md`.

### Scripts en `package.json`

- `pnpm dev`: Inicia el entorno de desarrollo en Storybook para visualizar los componentes mientras se desarrollan.
- `pnpm format`: Formatea el código con Prettier.
- `pnpm lint`: Lintea el código con ESLint.
- `pnpm build`: Genera la build de producción de la librería.
- `pnpm buid:storybook`: Genera la build de Storybook.
- `pnpm changeset`: Crea un nuevo changeset.
