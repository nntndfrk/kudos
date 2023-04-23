import {component$, Slot} from '@builder.io/qwik';
import {routeLoader$} from '@builder.io/qwik-city';


export const useServerTimeLoader = routeLoader$(() => {
  return {
    date: new Date().toISOString(),
  };
});

export default component$(() => {
  return (
    <main class="h-screen w-full bg-blue-600 font-mono">
      <Slot />
    </main>
  );
});
