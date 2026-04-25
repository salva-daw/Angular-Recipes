# Objetivos del Tutorial: Angular AI Tutor (Smart Recipe Box)

Este tutorial está diseñado para guiarte en la creación de una aplicación moderna con Angular (v19+), enfocándose en las mejores prácticas y las nuevas funcionalidades del framework.

## 1. Fundamentos y Arquitectura Moderna
- **Estructura Profesional**: Organización en carpetas `core`, `shared` y `features`.
- **Componentes Standalone**: Construcción de la aplicación sin `NgModules`.
- **Angular Signals**: Implementación del nuevo sistema de reactividad para el manejo de estado.
- **Sintaxis de Control de Flujo**: Uso de `@if`, `@for` y `@switch` en las plantillas.

## 2. Gestión de Datos y Estado
- **Servicios**: Organización de la lógica de negocio y comunicación entre componentes.
- **Computed Signals**: Creación de estados derivados eficientes.
- **Effects**: Manejo de efectos secundarios reactivos.

## 3. Navegación e Interacción
- **Angular Router**: Configuración de rutas dinámicas y navegación.
- **Formularios Reactivos**: Creación de formularios con validación avanzada.
- **Filtrado y Búsqueda**: Implementación de lógica interactiva en tiempo real.

## 4. Estética y UX
- **Estilado Moderno**: Aplicación de estilos CSS siguiendo estándares actuales.
- **Experiencia de Usuario**: Mejora de la interactividad y feedback visual.

## 5. Mentalidad de Desarrollo con IA
- **Integración de IA**: Cómo estructurar aplicaciones preparadas para funciones inteligentes.
- **Resolución de Problemas**: Uso del tutor como guía interactiva para retos específicos.

---

# Índice del Tutorial (21 Pasos)

### Fase 1: Cimientos y Estructura
1.  **Paso 1**: Configuración del Proyecto y Componente Raíz.
2.  **Paso 2**: Introducción a Angular Signals (Estado reactivo).
3.  **Paso 3**: Creación del Modelo de Datos (Interfaces).
4.  **Paso 4**: El Primer Servicio (Gestión de datos).
5.  **Paso 5**: Listado de Recetas (Uso de `@for`).

### Fase 2: Interactividad y Flujo de Datos
6.  **Paso 6**: Detalle de Receta (Vista individual).
7.  **Paso 7**: Comunicación entre Componentes (`input`).
8.  **Paso 8**: Computed Signals (Filtrado automático).
9.  **Paso 9**: Eventos y Salidas (`output`).
10. **Paso 10**: Borrado de Recetas.

### Fase 3: Navegación y Rutas
11. **Paso 11**: Configuración del Router.
12. **Paso 12**: Navegación Programática.
13. **Paso 13**: Parámetros de Ruta.
14. **Paso 14**: Enlaces Activos y Estilos.

### Fase 4: Formularios y Datos de Usuario
15. **Paso 15**: Introducción a Formularios Reactivos.
16. **Paso 16**: Validaciones de Formulario.
17. **Paso 17**: Edición de Recetas.
18. **Paso 18**: Manejo de Arrays dinámicos (`FormArray`).

### Fase 5: Pulido y Funciones Avanzadas
19. **Paso 19**: Efectos (`effect`) y Local Storage.
20. **Paso 20**: Mejoras de UI/UX (Feedback visual).
21. **Paso 21**: Preparación para Integración de IA.

---

# Desarrollo Paso a Paso

## Paso 0: Anatomía de un Proyecto Angular (Scaffolding)

Cuando creamos un proyecto con `ng new`, Angular nos regala una estructura profesional ya montada. Aquí están los archivos que tus alumnos deben conocer:

### Los archivos de Configuración (Los Manuales)
- **`package.json`**: Es la "Lista de la Compra". Contiene las librerías que usa la app y los comandos para ejecutarla (como `npm start`).
- **`angular.json`**: Es el "Plano de la Fábrica". Configura cómo se compila y se construye el proyecto.
- **`tsconfig.json`**: Las reglas del "Traductor". Configura cómo se traduce nuestro TypeScript a JavaScript.

### La carpeta `src/` (Nuestra Cocina)
- **`main.ts`**: Es el "Botón de Encendido". Es el punto de entrada que arranca toda la maquinaria de Angular.
- **`index.html`**: Es el "Único Marco". Angular es una **SPA** (*Single Page Application*), lo que significa que solo hay un HTML real, y Angular cambia su contenido sin recargar la página.
- **`styles.css`**: El "Maquillaje Global". Aquí van los estilos que afectan a toda la aplicación por igual.

### La carpeta `app/` (El Corazón)
Aquí es donde viven nuestros componentes, servicios y lógica. Es donde realmente sucede la magia.

### La CLI de Angular: Nuestro Asistente Robótico (`ng`)
El comando `ng` es la herramienta que usaremos para hablar con Angular desde la terminal. Estos son sus usos más habituales:
- **`ng serve`**: Pone la aplicación en marcha para que podamos verla en el navegador mientras trabajamos.
- **`ng generate` (o `ng g`)**: Crea automáticamente archivos (componentes, servicios, interfaces) siguiendo las mejores prácticas.
- **`ng build`**: Prepara la aplicación para ser publicada en internet.
- **`ng test`**: Revisa que todo nuestro código funcione correctamente.

---

## Paso 1: El Corazón de la Aplicación y la Estructura Profesional

### Concepto Clave 1: ¿Qué es un Componente?
Imagina que un componente es como una **pieza de LEGO**. Cada pieza tiene su propia forma (HTML), sus colores (CSS) y sabe qué hacer cuando la tocas (TypeScript). En el Angular moderno, estas piezas son **"Standalone"** (autónomas), lo que significa que no necesitan manuales externos complicados para funcionar.

### Concepto Clave 2: Organizando la "Ciudad" de nuestra App
Para que nuestro proyecto no se convierta en un caos de archivos, usamos una estructura profesional:
1.  **Core (El Ayuntamiento)**: Aquí reside lo que es único y central. Servicios que gestionan datos globales (como nuestra lista de recetas).
2.  **Shared (La Ferretería)**: Aquí guardamos herramientas que usamos en muchos sitios (un botón especial, una barra de búsqueda).
3.  **Features (Los Barrios)**: Cada "barrio" es una funcionalidad distinta (ej. el listado de recetas).

### Anatomía de un Componente (El Decorador `@Component`)
Para que una clase de TypeScript se convierta en un componente de Angular, usamos un "decorador". Es como ponerle una etiqueta a una caja para decir qué hay dentro:
1.  **Selector (`selector`)**: Es el nombre de la etiqueta HTML personalizada que inventamos (ej. `<app-root>`).
2.  **Imports (`imports`)**: Es la lista de herramientas que esta pieza necesita usar (como otras piezas de LEGO o funciones de Angular).
3.  **Template (`templateUrl`)**: Es el plano de construcción (HTML) que define la estructura visual.
4.  **Styles (`styleUrl`)**: Es el manual de pintura (CSS) que define la estética.

### Acción realizada:
- Creamos las carpetas `core`, `shared` y `features` para una organización profesional.
- Inicializamos nuestro componente raíz `App` cambiando su título a **"Smart Recipe Box"**.
- Usamos un **Signal** para el título.

## Paso 2: El Puente de Datos (Signals y Data Binding)

### Concepto Clave 1: Data Binding (El Pegamento)
El Data Binding es la forma en que el código de TypeScript y el diseño de HTML se hablan entre sí. Sin él, tendríamos una página estática que no cambia.
- **Interpolación `{{ }}`**: Es como dejar un hueco en el HTML para que Angular escriba un valor. Ejemplo: `<h1>{{ title() }}</h1>`.
- **Property Binding `[ ]`**: Sirve para cambiar "características" de un elemento (como si un botón está desactivado o el color de una imagen).
- **Event Binding `( )`**: Es la forma en que el HTML avisa al código que algo pasó. "¡Oye, alguien hizo click aquí!".

### Concepto Clave 2: Angular Signals (El Sensor Inteligente)
Si el Data Binding es el pegamento, los **Signals** son los sensores. 
Un Signal es un contenedor que "avisa" a todos los que lo están usando cuando su valor cambia. 
- **Crear**: `count = signal(0);`
- **Leer**: `count()` (siempre usamos paréntesis para "escuchar" el valor actual).
- **Cambiar**: `count.set(1);` o `count.update(n => n + 1);`

### Acción realizada:
- Explicamos la relación entre Signals y el sistema de binding de Angular.
- Prepararemos el HTML para mostrar el título dinámicamente usando interpolación.

## Paso 3: El Molde de los Datos (Tipado e Interfaces)

### Concepto Clave: TypeScript y el Tipado
Angular utiliza **TypeScript**, que es como JavaScript con "superpoderes" de seguridad. El **Tipado** nos permite decir qué tipo de información estamos usando (texto, números, listas).

#### Los Tipos de Datos Básicos (Nuestras materias primas)
- **`string`**: Texto (ej. "Harina").
- **`number`**: Números (ej. 150).
- **`boolean`**: Verdadero/Falso (ej. true).
- **`string[]`**: Una lista de textos (ej. ["Sal", "Pimienta"]).

### Las Interfaces (Nuestros Moldes)
Una **Interface** es un contrato. Define qué forma debe tener un objeto. Para nuestro recetario, todas las recetas deben seguir el mismo patrón.
- Ejemplo: Una receta *debe* tener un `id`, un `titulo` y una lista de `ingredientes`.

### Acción realizada:
- Definiremos la interface `Recipe` para que nuestra aplicación sepa exactamente cómo es una receta.
