import { render } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import App from "../App";
import AuthProvider from "../context/auth/AuthProvider";
import OnboardingProvider from "../context/Onboarding/OnboardingProvider";

// Mock do Firebase Auth pra não fazer requisição real
vi.mock("../lib/firebase", () => ({
  auth: {
    onAuthStateChanged: vi.fn((cb) => {
      cb(null); 
      return vi.fn(); 
    }),
    currentUser: null,
  },
}));

describe("App", () => {
  it("renderiza sem quebrar", () => {
    render(
      <AuthProvider>
        <OnboardingProvider>
          <App />
        </OnboardingProvider>
      </AuthProvider>
    );
    expect(document.body).toBeTruthy();
  });
});