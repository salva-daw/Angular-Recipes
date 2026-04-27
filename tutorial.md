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

## Paso 4: El Primer Servicio (Gestión de datos)

### Concepto Clave: ¿Qué es un Servicio?
Si los componentes son piezas de LEGO visuales, los **Servicios** son el "motor" o el "cerebro" que está detrás. Un servicio es un lugar donde guardamos la lógica que no pertenece a una sola pieza de la interfaz, sino que debe ser compartida por toda la aplicación.
- **Singletons**: Normalmente, un servicio es una "instancia única". Esto significa que todos los componentes que usen el servicio estarán hablando con el mismo motor y viendo los mismos datos.
- **Inyección de Dependencias**: Es la forma en que Angular entrega el servicio a quien lo necesite. En lugar de crearlo nosotros con `new`, le decimos a Angular: "Oye, necesito el motor de recetas", y Angular nos lo da.

### Nuestro Proyecto: `RecipeService`
Crearemos un servicio centralizado para gestionar todas nuestras recetas. Este servicio usará **Signals** para que cualquier cambio en la lista de recetas se refleje instantáneamente en toda la app.

#### Propiedades:
- **`recipesState` (privado)**: Un Signal que contiene el array de recetas actual. Lo mantenemos privado para que nadie pueda modificarlo directamente desde fuera sin pasar por nuestros métodos.
- **`recipes` (público)**: Un Signal de solo lectura (usando `computed`) que expone las recetas al resto de la aplicación.

#### Métodos:
- **`addRecipe(recipe)`**: Permite añadir una nueva receta a la lista.
- **`deleteRecipe(id)`**: Busca una receta por su ID y la elimina de la lista.
- **`updateRecipe(id, recipe)`**: Permite modificar los datos de una receta existente.

### Acción realizada:
- Crearemos `src/app/core/services/recipe.service.ts`.
- Implementaremos la lógica básica para almacenar y gestionar recetas.
- Añadiremos datos de prueba iniciales para poder trabajar en los siguientes pasos.

## Paso 5: Listado de Recetas (Uso de `@for`)

### Concepto Clave: Flujo de Control Moderno (`@for`)
En el Angular moderno, para mostrar listas de elementos usamos la sintaxis `@for`. Es mucho más rápida y fácil de leer que las versiones antiguas.

#### La importancia de `track`
Cuando usamos `@for`, Angular nos obliga a usar `track`. Esto es como ponerle una "etiqueta de identidad" a cada elemento de la lista (normalmente su `id`).
- **¿Por qué?**: Si la lista cambia (añadimos o borramos algo), Angular solo repintará el elemento exacto que ha cambiado, en lugar de borrar y volver a dibujar toda la lista. ¡Esto hace que la app sea súper rápida!

#### Estructura de un `@for`:
```html
@for (item of lista; track item.id) {
  <!-- Lo que se repite -->
} @empty {
  <!-- Lo que se muestra si la lista está vacía -->
}
```

### Nuestro Proyecto: `RecipeListComponent`
Crearemos nuestro primer componente de "funcionalidad" (feature). Este componente:
1.  **Inyectará** el `RecipeService`.
2.  **Leerá** la lista de recetas del servicio.
3.  **Dibujará** una tarjeta para cada receta usando `@for`.

### Concepto Clave: HTML Semántico y la etiqueta `<article>`
En el desarrollo moderno, no solo importa que la web se vea bien, sino que "tenga sentido" para las máquinas. Usamos etiquetas **semánticas** en lugar de simples `<div>`:
- **`<article>`**: La usamos para envolver cada receta porque es una pieza de contenido autónoma e independiente. Si sacáramos esa tarjeta y la pusiéramos en otro sitio, seguiría teniendo sentido por sí sola.
- **Beneficios**: Mejora el **SEO** (Google nos entiende mejor) y la **Accesibilidad** (los lectores de pantalla para personas con discapacidad pueden navegar fácilmente por la lista de artículos).

### Estética y Rendimiento: Tailwind CSS y NgOptimizedImage
Para que nuestra aplicación tenga un aspecto profesional y sea rápida, aplicamos dos conceptos avanzados:

1.  **Tailwind CSS (v4)**: En lugar de escribir CSS personalizado en archivos separados, usamos "clases utilitarias" directamente en el HTML. Esto asegura que el diseño sea consistente y respete el "reset" del framework.
    - Ejemplo: `class="bg-white rounded-xl shadow-md"`.
2.  **NgOptimizedImage**: Usamos la directiva oficial de Angular para cargar las imágenes de forma eficiente.
    - **Imágenes Locales**: Guardamos las fotos en `public/assets/images/` para evitar enlaces rotos externos.
    - **Atributo `fill`**: Permite que la imagen se adapte perfectamente al contenedor de la tarjeta sin distorsionarse.
    - **Prioridad**: Marcamos la primera imagen con `[priority]="true"` para que el navegador la cargue antes que nada.
3.  **Alineación con Flexbox**: Para evitar que las tarjetas se desvíen si una receta tiene más texto que otra, usamos un truco de CSS:
    - Aplicamos `flex-col` y `h-full` a la tarjeta para que todas midan lo mismo.
    - Usamos `flex-grow` en el contenido central.
    - Ponemos `mt-auto` en el pie de la tarjeta (rating y botones) para que siempre estén "empujados" hacia el fondo.

### Acción realizada:
- Crearemos el componente `RecipeListComponent` en `src/app/features/recipe-list/`.
- Usaremos la nueva sintaxis `@for` para recorrer las recetas.
- Implementaremos un diseño de tarjetas (cards) responsivo y alineado usando **Tailwind CSS (Flexbox)**.
- Optimizaremos la carga de imágenes con **NgOptimizedImage** y recursos locales.
- Utilizaremos el componente raíz `App` para mostrar este listado por ahora (antes de configurar las rutas).

## Paso 6: Detalle de Receta (Vista individual)

### Concepto Clave: Flujo de Control `@if`
A veces queremos mostrar algo solo si se cumple una condición. En el Angular moderno usamos `@if`. Es mucho más limpio que la antigua directiva `*ngIf`.

#### Estructura de un `@if`:
```html
@if (recetaSeleccionada) {
  <!-- Mostrar los detalles de la receta -->
} @else {
  <!-- Mostrar un mensaje: "Selecciona una receta para ver más" -->
}
```

### Nuestro Proyecto: `RecipeDetailComponent`
Crearemos un componente para mostrar toda la información de una receta específica (la "ficha técnica"). 
- **Ingredientes**: Usaremos un `@for` para listar cada ingrediente.
- **Instrucciones**: Mostraremos los pasos numerados de la preparación.
- **Diseño Detallado**: Usaremos una imagen hero (grande), tipografía clara para las instrucciones y un diseño limpio con Tailwind CSS.

### Comunicación entre componentes (Avance)
En este paso, para poder ver nuestro nuevo diseño, hemos configurado la aplicación para que muestre automáticamente la **primera receta** del listado. 

**Importante**: Esto es solo una solución temporal. En el **Paso 7**, aprenderemos a conectar ambos componentes para que, al hacer clic en cualquier tarjeta del listado, el detalle se actualice dinámicamente con la receta seleccionada.

### Acción realizada:
- Crearemos el componente `RecipeDetailComponent` en `src/app/features/recipe-detail/`.
- Implementaremos la lógica para mostrar ingredientes e instrucciones.
- Usaremos `@if` para gestionar el estado de "receta no seleccionada".
- Diseñaremos la vista detallada con un enfoque en la legibilidad (UX para cocina).
- Configuraremos el componente raíz para mostrar la primera receta como demostración del diseño.

## Paso 7: Comunicación entre Componentes (Inputs Dinámicos)

### Concepto Clave: La función `input()`
En el Angular moderno, ya no usamos el decorador `@Input()`. Ahora usamos la función `input()`, que crea un **Signal**.
- **Ventaja**: Como es un Signal, el componente detecta automáticamente cualquier cambio y se repinta de forma súper eficiente.
- **Sintaxis**: `recipe = input<Recipe | null>(null);`

### Flujo de Datos (Padre a Hijo)
Para que la aplicación sea interactiva, el flujo será el siguiente:
1.  **Hijo (`RecipeList`)**: Avisa al padre cuando el usuario hace clic en una receta.
2.  **Padre (`App`)**: Guarda la receta seleccionada en un Signal.
3.  **Hijo (`RecipeDetail`)**: Recibe esa receta a través de su `input()` y se actualiza automáticamente.

### Nuestro Proyecto: Conectando las piezas
Modificaremos el listado para que las tarjetas sean clicables. Al pulsar una, el componente raíz (`App`) cambiará su estado interno y el componente de detalle mostrará la nueva información al instante.

### Acción realizada:
- Usaremos la función **`output()`** en `RecipeListComponent` para emitir la receta seleccionada.
- Implementaremos la captura del evento de clic en las tarjetas, utilizando **`event.stopPropagation()`** en el botón de eliminar para evitar conflictos entre acciones.
- Crearemos el signal **`selectedRecipe`** en el componente raíz `App` para centralizar el estado de la aplicación.
- Conectaremos dinámicamente el `input` de `RecipeDetailComponent` para que reaccione automáticamente a los cambios de selección.
- Añadiremos una mejora de UX usando **`window.scrollTo`** para que la página suba suavemente al detalle cuando el usuario elija una receta.

## Paso 8: Computed Signals (Filtrado automático)

### Concepto Clave: El Signal Derivado (`computed`)
A veces necesitamos un valor que dependa de otros. En lugar de calcularlo manualmente cada vez, usamos **`computed()`**.
- **Reactividad inteligente**: Un `computed` solo se vuelve a calcular si alguno de los Signals que lee (sus "dependencias") cambia.
- **Solo lectura**: No puedes hacer `.set()` en un `computed`. Su valor es el resultado automático de su lógica interna.
- **Rendimiento**: Si el valor no ha cambiado realmente, Angular no avisará a la interfaz, ahorrando trabajo de renderizado.

### Nuestra Aplicación: El Buscador en Tiempo Real
Hemos implementado una barra de búsqueda que filtra las recetas por título o categoría.

#### La lógica:
1.  **`searchTerm`**: Un Signal de tipo `string` que guarda lo que el usuario escribe.
2.  **`filteredRecipes`**: Un Signal de tipo `computed` que:
    - Lee `searchTerm()`.
    - Lee `recipes()` del servicio.
    - Devuelve una nueva lista filtrada.
3.  **Template**: El `@for` ahora recorre `filteredRecipes()` en lugar de la lista completa.

### Acción realizada:
- Implementamos una barra de búsqueda con diseño moderno (iconos y efectos de foco).
- Usamos la función **`computed()`** para gestionar el estado derivado del filtrado.
- Añadimos la función **`updateSearch`** para capturar los eventos del teclado y actualizar el estado de forma reactiva.
- Optimizamos el componente para que el filtrado sea insensible a mayúsculas/minúsculas.
