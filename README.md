# 🍔 Cantina FIAP - Refectory App (CP1)

Aplicativo mobile desenvolvido em **React Native com Expo** para o gerenciamento de pedidos e filas nas cantinas da FIAP. Etregando uma experiência de usuário fluida e regras de negócio funcionais.

## 🚀 Funcionalidades Implementadas

- **Navegação Moderna:** Utilização do `Expo Router` com proteção de rotas (Redirecionamento automático se o usuário não estiver logado).
- **Gerenciamento de Estado Global:** Implementação da `Context API` para manter os dados do usuário, do carrinho e do histórico de pedidos sincronizados entre todas as telas.
- **Persistência de Dados (Local Storage):** Uso do `@react-native-async-storage/async-storage` para salvar a sessão do usuário e o histórico de compras. O app mantém os dados mesmo após ser fechado.
- **Regra de Negócio Dinâmica:** Cálculo automático de **10% de desconto** no checkout exclusivo para usuários com o perfil "Professor".
- **UX/UI Interativa:** - Simulação de ocupação em tempo real das cantinas.
  - Alertas nativos e Toasts para feedback de ações.
  - Renderização otimizada de listas usando `FlatList`.

## 🛠️ Tecnologias Utilizadas

- React Native (SDK 55)
- Expo & Expo Router
- Context API (Hooks: useContext, useState, useEffect)
- Async Storage (Persistência)
- Expo Vector Icons (Ionicons)

## 📱 Como Executar o Projeto

1. Clone o repositório ou extraia os arquivos.
2. Abra o terminal na pasta raiz do projeto.
3. Instale as dependências executando:
   ```bash
   npm install --legacy-peer-deps

   