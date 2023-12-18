import { dispatch, subscribe } from "./comms";

export const { sessionToken, redirect } = new (class {
  private key: string | null = null;

  public constructor() {
    if (!process.browser) {
      return;
    }

    const meta = document.querySelector<HTMLMetaElement>(
      'meta[name="youcan-api-key"]'
    );

    if (!meta || !meta.content) {
      throw new Error("youcan api key is not set");
    }

    this.key = meta.content;
  }

  sessionToken = async (): Promise<string> => {
    return new Promise((resolve) => {
      subscribe('QANTRA::SESSION_TOKEN.RES', (id) => resolve(id))
      
      dispatch('QANTRA::SESSION_TOKEN.REQ');   
    })
  };

  redirect = async (url: string): Promise<void> => {
    dispatch('QANTRA::NAV.REDIRECT.REMOTE', url)
  }
})();
