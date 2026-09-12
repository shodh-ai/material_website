"use client";

import { Tabs as TabsPrimitive } from "@base-ui/react/tabs";
import { Slider as SliderPrimitive } from "@base-ui/react/slider";

export function Tabs(props: TabsPrimitive.Root.Props) {
  return <TabsPrimitive.Root data-slot="tabs" {...props} />;
}

export function TabsList(props: TabsPrimitive.List.Props) {
  return <TabsPrimitive.List data-slot="tabs-list" {...props} />;
}

export function TabsTrigger(props: TabsPrimitive.Tab.Props) {
  return <TabsPrimitive.Tab data-slot="tabs-trigger" {...props} />;
}

export function TabsContent(props: TabsPrimitive.Panel.Props) {
  return <TabsPrimitive.Panel data-slot="tabs-content" {...props} />;
}

export function Slider(props: SliderPrimitive.Root.Props) {
  return <SliderPrimitive.Root data-slot="slider" thumbAlignment="edge" {...props}>
    <SliderPrimitive.Control data-slot="slider-control">
      <SliderPrimitive.Track data-slot="slider-track">
        <SliderPrimitive.Indicator data-slot="slider-range" />
      </SliderPrimitive.Track>
      <SliderPrimitive.Thumb data-slot="slider-thumb" />
    </SliderPrimitive.Control>
  </SliderPrimitive.Root>;
}
