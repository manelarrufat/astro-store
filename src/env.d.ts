/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

interface User {
  name: string;
  email: string;
  // TODO:
}

declare namespace App {
  interface Locals {
    isLoggedIn: boolean;
    user: User | null;
    isAdmin: boolean;
  }
}
