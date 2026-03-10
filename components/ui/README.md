# UI Components Library

A comprehensive collection of modern, premium UI components with beautiful gradients, smooth animations, and dark mode support.

## Components

### Layout Components

#### Card
Versatile card component with header, title, and content sections.
```tsx
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui"

<Card>
  <CardHeader>
    <CardTitle>Card Title</CardTitle>
  </CardHeader>
  <CardContent>
    Your content here
  </CardContent>
</Card>
```

#### Tabs
Tab navigation with smooth transitions.
```tsx
import { Tabs } from "@/components/ui"

<Tabs
  tabs={[
    { id: "1", label: "Tab 1", content: <div>Content 1</div> },
    { id: "2", label: "Tab 2", content: <div>Content 2</div> }
  ]}
  defaultTab="1"
/>
```

#### Accordion
Expandable accordion with single or multiple item expansion.
```tsx
import { Accordion } from "@/components/ui"

<Accordion
  items={[
    { id: "1", title: "Item 1", content: "Content 1" },
    { id: "2", title: "Item 2", content: "Content 2" }
  ]}
  allowMultiple={false}
/>
```

#### Modal
Full-featured modal with backdrop blur and keyboard support.
```tsx
import { Modal } from "@/components/ui"

<Modal
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  title="Modal Title"
  size="md"
>
  Your content here
</Modal>
```

### Form Components

#### Button
Feature-rich button with multiple variants and loading states.
```tsx
import { Button } from "@/components/ui"

<Button variant="primary" size="md" isLoading={false}>
  Click me
</Button>
```

**Variants:** `primary`, `secondary`, `outline`, `ghost`, `danger`  
**Sizes:** `sm`, `md`, `lg`

#### Input
Input field with label, error states, and icon support.
```tsx
import { Input } from "@/components/ui"

<Input
  label="Email"
  placeholder="Enter your email"
  error="Invalid email"
  leftIcon={<MailIcon />}
/>
```

#### Switch
Toggle switch with smooth animations.
```tsx
import { Switch } from "@/components/ui"

<Switch
  checked={isEnabled}
  onChange={setIsEnabled}
  label="Enable notifications"
  size="md"
/>
```

#### ChatInput
Specialized chat input with auto-resize and keyboard shortcuts.
```tsx
import { ChatInput } from "@/components/ui"

<ChatInput
  onSend={(message) => console.log(message)}
  placeholder="Type a message..."
  disabled={false}
/>
```

### Display Components

#### Badge
Colorful badges with optional animated dot indicator.
```tsx
import { Badge } from "@/components/ui"

<Badge variant="primary" size="md" dot={true}>
  New
</Badge>
```

**Variants:** `default`, `primary`, `success`, `warning`, `danger`, `info`

#### Avatar
Avatar with image support, initials fallback, and status indicators.
```tsx
import { Avatar } from "@/components/ui"

<Avatar
  src="/avatar.jpg"
  name="John Doe"
  size="md"
  status="online"
/>
```

**Status:** `online`, `offline`, `away`, `busy`

#### Progress
Progress bar with gradient variants and shimmer animation.
```tsx
import { Progress } from "@/components/ui"

<Progress
  value={75}
  max={100}
  variant="gradient"
  showLabel={true}
/>
```

#### MessageBubble
Chat message bubble with speaker identification.
```tsx
import { MessageBubble } from "@/components/ui"

<MessageBubble
  message={{
    speaker: "user",
    message: "Hello!",
    timestamp: new Date()
  }}
/>
```

### Feedback Components

#### Tooltip
Contextual tooltip with multiple positions.
```tsx
import { Tooltip } from "@/components/ui"

<Tooltip content="Helpful information" position="top">
  <button>Hover me</button>
</Tooltip>
```

**Positions:** `top`, `bottom`, `left`, `right`

## Features

✨ **Premium Design** - Modern gradients and smooth animations  
🌙 **Dark Mode** - Full dark mode support out of the box  
♿ **Accessible** - Keyboard navigation and ARIA labels  
📱 **Responsive** - Works perfectly on all screen sizes  
🎨 **Customizable** - Easy to customize with Tailwind classes  
⚡ **Performant** - Optimized animations and transitions  

## Design Principles

- **Vibrant Gradients**: Blue to purple gradients for primary actions
- **Smooth Transitions**: 200ms transitions for all interactive elements
- **Consistent Spacing**: Using Tailwind's spacing scale
- **Modern Typography**: Clean, readable font hierarchy
- **Micro-animations**: Subtle animations for better UX

## Usage

Import components from the barrel export:

```tsx
import { Button, Card, Badge, Avatar } from "@/components/ui"
```

Or import individually:

```tsx
import { Button } from "@/components/ui/button"
```
