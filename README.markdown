# Simple Dark Mode

In today's web development landscape, the demand for dark mode functionality has become increasingly prevalent. Simple Dark Mode emerges as a versatile solution, offering developers an easy and lightweight way to implement dark mode in their web applications.

## Demo

https://codepen.io/Powza1/pen/vYPgEmV

## Customizability

Tailored Preferences: Users can easily customize their dark mode experience by choosing from three options: `system` (follows the system preference), `dark` or `light`

Type: You have the option of either a single button toggle or a dropdown menu. `button` or `dropdown`

## LocalStorage Intergration

Persistent User Preferences: The plugin leverages LocalStorage to store user preferences. This ensures that the chosen dark mode setting persists across sessions, providing users with a consistent experience each time they visit the website.

## Dynamic Theme Adjustment

Time-Sensitive Theme Switching: For added user comfort, developers can enable dynamic theme adjustment. During specified hours (configurable with dynamicAdjustStartHour and dynamicAdjustEndHour), the default theme will automatically switch between light and dark modes based on the time of day.

## How to Use

Just add a link to the css and js in your `<head>`:

```html
<link rel="stylesheet" type="text/css" href="css/styles.css" />
<script src="js/dark-mode.js"></script>
<script>
  const darkMode = new DarkMode();
</script>
```

CSS Implementing Dark Mode:

- Dark Mode is implemented using the dark-mode mixin and media queries.
- Within the dark-mode mixin, adjust root variable values to reflect dark mode aesthetics.
- Media queries adjust the theme based on user preference (prefers-color-scheme) or explicitly set theme.
- See SCSS or CSS files for code examples.

```css
:root {
  --color-white: #fff;
  --color-black: #000;
  --text: var(--color-black);
  --background: var(--color-white);
  --background-variant: #f0f0f0;
}
:root[theme="dark"] {
  --text: var(--color-white);
  --background: #222831;
  --background-variant: #393e46;
}
@media (prefers-color-scheme: dark) {
  :root[theme="system"] {
    --text: var(--color-white);
    --background: #222831;
    --background-variant: #393e46;
  }
}
```

## Settings

| Option                 | Type    | Default        | Description                                                                       |
| ---------------------- | ------- | -------------- | --------------------------------------------------------------------------------- |
| default                | string  | system         | `system`, `dark`, `light`                                                         |
| selector               | string  | .darkmode      | class or id                                                                       |
| storageKey             | string  | darkmode-theme | Set a localStorage key name                                                       |
| type                   | string  | dropdown       | `button`, `dropdown`                                                              |
| dropdownToggleName     | string  | Theme          | Dropdown toggle name                                                              |
| dynamicAdjust          | boolean | false          | Will override default start light then switch to dark between time. 24 hour time. |
| dynamicAdjustStartHour | integer | 18             | Start dark theme at hour 18                                                       |
| dynamicAdjustEndHour   | integer | 6              | End dark theme at hour 6                                                          |

### Example

```javascript
const darkMode = new DarkMode({
  default: "system",
  selector: ".darkmode",
  storageKey: "darkmode-theme",
  type: "dropdown",
  dropdownToggleName: "Theme",
  dynamicAdjust: true,
  dynamicAdjustStartHour: 18,
  dynamicAdjustEndHour: 6,
});
```
