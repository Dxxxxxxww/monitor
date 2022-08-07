class Store {
  private storage: Storage;
  private disabled: boolean = false;

  constructor(isSession?: boolean) {
    this.storage = isSession ? window.sessionStorage : window.localStorage;
    try {
      const testKey = '__storejs__';
      this.storage.set(testKey, testKey);
      if (this.storage.get(testKey) !== testKey) {
        this.storage.disabled = true;
      }
      this.storage.remove(testKey);
    } catch (e) {
      this.storage.disabled = true;
    }
  }

  set(key: string, val: any) {
    if (this.disabled) {
      return;
    }
    if (val === undefined) {
      return this.remove(key);
    }
    this.storage.setItem(key, this.serialize(val));
    return val;
  }

  get(key: string, def?: any) {
    if (this.disabled) {
      return def;
    }
    let val = this.deserialize(this.storage.getItem(key));
    return val === undefined ? def : val;
  }

  has(key: string) {
    return this.get(key) !== undefined;
  }

  remove(key: string) {
    if (this.disabled) {
      return;
    }
    this.storage.removeItem(key);
  }

  clear() {
    if (this.disabled) {
      return;
    }
    this.storage.clear();
  }

  getAll() {
    if (this.disabled) {
      return null;
    }
    const ret: { [key: string]: any } = {};
    this.forEach((key: string, val: any) => {
      ret[key] = val;
    });
    return ret;
  }

  forEach(callback: (key: string, val: any) => void) {
    if (this.disabled) {
      return;
    }
    for (let i = 0; i < this.storage.length; i++) {
      const key = this.storage.key(i) as string;
      callback(key, this.get(key));
    }
  }

  serialize(val: any) {
    return JSON.stringify(val);
  }

  deserialize(val: string | null) {
    if (!val) {
      return undefined;
    }
    try {
      return JSON.parse(val);
    } catch (e) {
      return val || undefined;
    }
  }
}

const localStore = new Store();
const sessionStore = new Store(true);

export { localStore, sessionStore };
