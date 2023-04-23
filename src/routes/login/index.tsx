import type {QwikChangeEvent} from "@builder.io/qwik";
import {useSignal} from "@builder.io/qwik";
import {useStore} from "@builder.io/qwik";
import {component$, $} from "@builder.io/qwik";
import {FormField} from "~/components/router-head/ui/form-field";


export default component$(() => {
  const action = useSignal('login');

  const formState = useStore({
    email: '',
    password: '',
    firstName: '',
    lastName: ''
  });

  const handleInputChange = $((e: QwikChangeEvent<HTMLInputElement>, field: string) => {
    if (field in formState) {
      (formState)[field as keyof typeof formState] = e.target.value;
    }
  });

  return (
    <div class="h-full flex justify-center items-center flex-col gap-y-4">
      <button
        class="absolute top-8 right-8 rounded-xl bg-yellow-300 font-semibold text-blue-600 px-3 py-2 transition duration-300 ease-in-out hover:bg-yellow-400 hover:-translate-y-1"
        onClick$={$(() => (action.value = action.value === 'login' ? 'register' : 'login'))}
      >
        {action.value === 'login' ? 'Sign Up' : 'Sign In'}
      </button>

      <h2 class="text-5xl font-extrabold text-yellow-300">Welcome to Kudos!</h2>
      <p class="font-semibold text-slate-300">
        {action.value === 'login' ? 'Log In To Give Some Praise!' : 'Sign Up To Get Started!'}
      </p>
      <form class="rounded-2xl bg-gray-200 p-6 w-96">
        <FormField
          identity="email"
          label="Email"
          value={formState.email}
          type="email"
          placeholder="Email"
          change={$((e: QwikChangeEvent<HTMLInputElement>) => handleInputChange(e, 'email'))}
        />

        <FormField
          identity="password"
          label="Password"
          value={formState.password}
          type="password"
          placeholder="Password"
          change={$((e: QwikChangeEvent<HTMLInputElement>) => handleInputChange(e, 'password'))}
        />

        {
          action.value !== 'login' && (
            <>
              <FormField
                identity="firstName"
                label="First Name"
                value={formState.firstName}
                placeholder="First Name"
                change={$((e: QwikChangeEvent<HTMLInputElement>) => handleInputChange(e, 'firstName'))}
              />
              <FormField
                identity="lastName"
                label="Last Name"
                value={formState.lastName}
                placeholder="Last Name"
                change={$((e: QwikChangeEvent<HTMLInputElement>) => handleInputChange(e, 'lastName'))}
              />
            </>
          )
        }

        <div class="w-full text-center">
          <button
            type="submit"
            name="_action"
            value={action.value}
            class="rounded-xl mt-2 bg-yellow-300 px-3 py-2 text-blue-600 font-semibold transition duration-300 ease-in-out hover:bg-yellow-400 hover:-translate-y-1"
          >
            {action.value === 'login' ? "Sign In" : "Sign Up"}
          </button>
        </div>
      </form>
    </div>
  );
});