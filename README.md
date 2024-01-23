# Simple Dark Mode

In today's web development landscape, the demand for dark mode functionality has become increasingly prevalent. Simple Dark Mode emerges as a versatile solution, offering developers an easy and lightweight way to implement dark mode in their web applications.

## Demo

https://codepen.io/Powza1/pen/vYPgEmV

## Customizability

Tailored Preferences: Users can easily customize their dark mode experience by choosing from three options: `system` (follows the system preference), `dark` or `light`

Selector Flexibility: Developers have the flexibility to define their own toggle button by specifying a selector class or ID, making it seamless to integrate the dark-mode toggle into their projects.

## LocalStorage Intergration

Persistent User Preferences: The plugin leverages LocalStorage to store user preferences. This ensures that the chosen dark mode setting persists across sessions, providing users with a consistent experience each time they visit the website.

Reset Option: Developers can choose to reset LocalStorage, allowing for a fresh start if needed. This feature is particularly useful during development or testing phases.

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

## Settings

| Option                 | Type    | Default   | Description                                                                       |
| ---------------------- | ------- | --------- | --------------------------------------------------------------------------------- |
| default                | string  | system    | `system`, `dark`, `light`                                                         |
| selector               | string  | .darkmode | class or id                                                                       |
| storageKey             | string  | theme     | Set a localStorage key name                                                       |
| resetStorage           | boolean | false     | Reset localStorage                                                                |
| dynamicAdjust          | boolean | false     | Will override default start light then switch to dark between time. 24 hour time. |
| dynamicAdjustStartHour | integer | 18        | Start dark theme at hour 18                                                       |
| dynamicAdjustEndHour   | integer | 6         | End dark theme at hour 6                                                          |

### Example

```javascript
const darkMode = new DarkMode({
  selector: "#myToggle",
  storageKey: "darkmode-theme",
  dynamicAdjust: true,
  dynamicAdjustStartHour: 15,
  dynamicAdjustEndHour: 5,
});
```
