<template>
  <div
    class="flex min-h-screen flex-col space-y-8 p-4 md:flex-row md:space-y-0 md:space-x-12 md:p-8"
  >
    <div class="flex-1 space-y-4">
      <h1 class="text-2xl font-semibold">Finalizar Compra</h1>
      <input
        type="text"
        placeholder="Nome Completo*"
        class="w-full flex-1 rounded border border-gray-300 bg-white px-4 py-2 text-black focus:ring focus:outline-none dark:bg-gray-800 dark:text-white"
        v-model="name"
        @blur="onNameBlur"
      />
      <Message v-if="nameError" severity="error" class="mt-1">Nome completo é obrigatório</Message>

      <div class="flex space-x-4">
        <InputMask
          placeholder="CPF*"
          id="basic"
          v-model="cpf"
          mask="999.999.999-99"
          class="flex-1 rounded border border-gray-300 bg-white px-4 py-2 text-black focus:ring focus:outline-none dark:bg-gray-800 dark:text-white"
        />
        <Message v-if="cpfError" severity="error" class="mt-1">Nome completo é obrigatório</Message>

        <InputMask
          placeholder="Celular*"
          id="phone"
          v-model="phone"
          mask="(99) 9 9999-9999"
          class="flex-1 rounded border border-gray-300 bg-white px-4 py-2 text-black focus:ring focus:outline-none dark:bg-gray-800 dark:text-white"
        />
        <Message v-if="phoneError" severity="error" class="mt-1">Telefone é obrigatório</Message>
      </div>

      <input
        type="email"
        v-model="email"
        placeholder="E-mail*"
        autocomplete="email"
        class="w-full flex-1 rounded border border-gray-300 bg-white px-4 py-2 text-black focus:ring focus:outline-none dark:bg-gray-800 dark:text-white"
        @blur="onEmailBlur"
      />
      <Message v-if="emailError" severity="error" class="mt-1">E-mail invalido</Message>

      <div class="flex space-x-4">
        <InputMask
          placeholder="Cep"
          id="cep"
          v-model="cep"
          mask="99999-999"
          class="flex-1 rounded border border-gray-300 bg-white px-4 py-2 text-black focus:ring focus:outline-none dark:bg-gray-800 dark:text-white"
        />
        <Message v-if="cepError" severity="error" class="mt-1">CEP é obrigatório</Message>

        <input
          type="text"
          placeholder="Endereço"
          class="flex-1 rounded border border-gray-300 bg-white px-4 py-2 text-black focus:ring focus:outline-none dark:bg-gray-800 dark:text-white"
        />
      </div>

      <div class="flex space-x-4">
        <input
          type="text"
          placeholder="Cidade"
          class="flex-1 rounded border border-gray-300 bg-white px-4 py-2 text-black focus:ring focus:outline-none dark:bg-gray-800 dark:text-white"
        />
        <input
          type="text"
          placeholder="Estado"
          class="w-1/3 flex-1 rounded border border-gray-300 bg-white px-4 py-2 text-black focus:ring focus:outline-none dark:bg-gray-800 dark:text-white"
        />
      </div>
    </div>

    <div class="w-full rounded-lg bg-gray-200 p-6 shadow md:w-96 dark:bg-gray-600">
      <div
        class="mt-4 grid grid-cols-5 items-center gap-4 border-t pt-4"
        v-for="(item, index) in shoppingCartItems"
        :key="index"
      >
        <span class="col-span-2 font-medium">{{ item.title }}</span>
        <span>{{ index + 1 }}</span>
        <span>{{ formatToCurrencyMoney(item.price) }}</span>
        <button>
          <TrashIcon class="h-5 w-5 cursor-pointer text-gray-400 hover:text-red-500" />
        </button>
      </div>

      <div class="mt-6 flex items-center justify-between">
        <span class="font-medium">Total:</span>
        <span class="text-xl font-bold">{{ formatToCurrencyMoney(totalPrice) }}</span>
      </div>

      <button
        class="mt-4 w-full cursor-pointer rounded-lg bg-green-600 py-3 font-medium text-white transition hover:bg-green-700"
        v-on:click="validateFields"
      >
        Finalizar
      </button>
    </div>
  </div>
</template>

<script lang="ts">
  import { useStore } from '@/store'
  import { validateCEP, validateEmail, validatePhone } from '@/utils/form-validator'
  import { formatToCurrencyMoney } from '@/utils/formater.util'
  import { TrashIcon } from '@heroicons/vue/16/solid'
  import { InputMask, Message } from 'primevue'
  import { computed, defineComponent, ref } from 'vue'

  export default defineComponent({
    name: 'ShoppingView',
    components: {
      TrashIcon,
      InputMask,
      Message,
    },
    setup() {
      const store = useStore()

      const name = ref('')
      const nameError = ref(false)
      const email = ref('')
      const emailError = ref(false)
      const cpf = ref('')
      const cpfError = ref(false)
      const phone = ref('')
      const phoneError = ref(false)
      const cep = ref('')
      const cepError = ref(false)

      const validateFields = () => {
        nameError.value = name.value.trim() === ''
        emailError.value = validateEmail(email.value)
        cpfError.value = cpf.value.trim() === ''
        phoneError.value = phone.value.trim() === ''
        cepError.value = cep.value.trim() === ''
      }

      const onNameBlur = () => {
        nameError.value = name.value.trim() === ''
      }

      const onEmailBlur = () => {
        emailError.value = validateEmail(email.value)
      }

      return {
        shoppingCartItems: computed(() => store.getters.allShoppingCartItems),
        totalPrice: computed(() => store.getters.totalPrice),
        name,
        nameError,
        email,
        emailError,
        cpf,
        cpfError,
        phone,
        phoneError,
        cep,
        cepError,
        onNameBlur,
        onEmailBlur,
        validateEmail,
        validateFields,
        validateCelular: validatePhone,
        validateCEP,
        formatToCurrencyMoney,
      }
    },
  })
</script>
