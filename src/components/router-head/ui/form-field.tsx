import type {PropFunction, QwikChangeEvent} from "@builder.io/qwik";
import {$, component$, useSignal} from "@builder.io/qwik";

interface FormFieldProps<T = string> {
  identity: string,
  label: string,
  type?: string,
  value: T,
  placeholder?: string,
  change?: PropFunction<(e: QwikChangeEvent<HTMLInputElement>) => void>,
  error?: string,
}

export const FormField = component$(({
  identity,
  label,
  type = 'text',
  value,
  placeholder = '',
  change,
  error = ''
}: FormFieldProps) => {
  const errorText = useSignal(error);

  const handleInputChange = $((event: QwikChangeEvent<HTMLInputElement>) => {
    change?.(event);
    errorText.value = '';
  });

  return (
    <>
      <label for={identity} class="text-blue-600 font-semibold">
        {label}
      </label>
      <input
        type={type}
        id={identity}
        placeholder={placeholder}
        name={identity}
        class="w-full p-2 rounded-xl my-2"
        value={value}
        onChange$={handleInputChange}
      />
      <div class="text-xs font-semibold text-center tracking-wide text-red-400 w-full">
        {errorText.value || ''}
      </div>
    </>
  )
});