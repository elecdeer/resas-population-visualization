---
name: 'component-page'
root: 'src/components/page'
output: '**/*'
ignore: []
questions:
  name: 'Please enter component name'
---

# Variables

- namePascal: `{{ inputs.name | pascal }}`
- nameKebab: `{{ inputs.name | kebab }}`

# `{{ namePascal }}/{{ namePascal }}`.tsx
```typescript jsx
import React from "react";
import styles from "./{{ namePascal }}.module.scss";

export const {{ namePascal }}: React.VFC = () => {
  return (
    <>
    </>
  );
};

```

# `{{ namePascal }}/{{ namePascal }}`.page.tsx
```typescript jsx
import React from "react";
import { {{ namePascal }} } from "./{{ namePascal }}";

export const {{ namePascal }}Page: React.VFC = () => {
  return (
    <{{ namePascal }} />
  );
};

```


# `{{ namePascal }}/{{ namePascal }}`.module.scss
```scss
.{{ nameKebab }} {
  
}
```

# `{{ namePascal }}/{{ namePascal }}`.test.tsx
```typescript jsx
import { {{ namePascal }} } from "./{{ namePascal }}";
import { render } from "@testing-library/react";

test("{{ namePascal }} Component Snapshot Test", () => {
  const { asFragment } = render(<{{ namePascal }} />);
  expect(asFragment()).toMatchSnapshot();
});

```

# `{{ namePascal }}/{{ namePascal }}`.stories.tsx
```typescript jsx
import { {{ namePascal }} } from "./{{ namePascal }}";

export default {
	title: "ui/{{ namePascal }}",
	component: {{ namePascal }}
}

export const Default = () => <{{ namePascal }} />

```

