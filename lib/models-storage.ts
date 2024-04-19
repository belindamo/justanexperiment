import { PREDEFINED_MODELS } from "./constants";
import { AIModel, AIModelKey } from "./types";

const DB_NAME = "jae-models";

class ModelStorage {
  private static instance: ModelStorage;

  private db?: IDBDatabase;

  /**
   * Private constructor to initialize singleton instance
   */
  private constructor() {
    const request = indexedDB.open(DB_NAME, 1);

    request.onerror = () => {
      console.error("Error opening database");
    };

    request.onupgradeneeded = async () => {
      request.result.createObjectStore("items", { keyPath: "name" });
      request.result.createObjectStore("keys", { keyPath: "provider" });
      this.db = request.result;
      await this.validateDefaultModels();
    };

    request.onsuccess = async () => {
      this.db = request.result;
      await this.validateDefaultModels();
    };
  }

  /* Check that predefined models are registered on DB */
  private validateDefaultModels() {
    return Promise.all(PREDEFINED_MODELS.map((model) => this.ensureDefaultKey(model)));
  }


  /**
   * Ensure that the default model key exists
   * @param db 
   * @param name 
   * @returns 
   */
  private ensureDefaultKey(name: string): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      if (!this.db) {
        reject("Database not initialized");
        return;
      }
      const transaction = this.db.transaction(["items"], "readonly");
      const objectStore = transaction.objectStore("items");
      const getRequest = objectStore.get(name);

      getRequest.onsuccess = () => {
        if (!getRequest.result) {
          this.addUpdate({ name, enabled: true, canBeDeleted: false }).then(resolve).catch(reject)
        }
      };
      getRequest.onerror = () => {
        this.addUpdate({ name, enabled: true, canBeDeleted: false }).then(resolve).catch(reject)
      };
    });
  }

  /**
   * Get the singleton instance
   */
  public static get shared(): ModelStorage {
    if (!ModelStorage.instance) {
      ModelStorage.instance = new ModelStorage();
    }
    return ModelStorage.instance;
  }

  /**
   * Add or update new model to the IndexedDB
   * @param model 
   * @returns 
   */
  public addUpdate(model: AIModel): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      if (!this.db) {
        reject("Database not initialized");
        return;
      }
      const transaction = this.db.transaction(["items"], "readwrite");
      const objectStore = transaction.objectStore("items");

      const objectRequest = objectStore.put(model);
      objectRequest.onsuccess = () => resolve();
      objectRequest.onerror = () => {
        reject(`Error adding object: ${model.name}`);
      };
    });
  }

  /**
   * Delete object from IndexedDB
   * @param name 
   */
  public delete(name: string) {
    return new Promise<void>((resolve, reject) => {
      if (!this.db) {
        reject("Database not initialized");
        return;
      }

      const transaction = this.db.transaction(["items"], "readwrite");
      const objectStore = transaction.objectStore("items");

      const objectRequest = objectStore.delete(name);
      objectRequest.onsuccess = () => resolve();
      objectRequest.onerror = () => {
        reject(`Error deleting object: ${name}`);
      };
    });
  }

  /**
   * Get all stored objects
   * @returns 
   */
  public getAll(): Promise<AIModel[]> {
    return new Promise<AIModel[]>((resolve, reject) => {
      if (!this.db) {
        reject("Database not initialized");
        return;
      }

      const transaction = this.db.transaction(["items"], "readonly");
      const objectStore = transaction.objectStore("items");
      const cursorRequest = objectStore.openCursor();
      const objects: AIModel[] = [];

      cursorRequest.onsuccess = (event: any) => {
        const cursor = event.target.result;
        if (cursor) {
          objects.push(cursor.value);
          cursor.continue();
        } else {
          /* Sort the models to keep the predefined in the top */
          objects.sort((a: AIModel, b: AIModel) => {
            if (!a.canBeDeleted && b.canBeDeleted) {
              return -1;
            }
            if (a.canBeDeleted && !b.canBeDeleted) {
              return 1;
            }
            if (!a.canBeDeleted && !b.canBeDeleted) {
              const idxA = PREDEFINED_MODELS.indexOf(a.name);
              const idxB = PREDEFINED_MODELS.indexOf(b.name);
              if (idxA < idxB) return -1;
              return 1;
            }
            return 1;
          })
          resolve(objects);
        }
      };

      cursorRequest.onerror = () => {
        reject("Error getting objects");
      };
    })
  }

  public clean() {
    return new Promise<void>((resolve, reject) => {
      if (!this.db) {
        reject("Database not initialized");
        return;
      }

      const transaction = this.db.transaction(["items"], "readwrite");
      const objectStore = transaction.objectStore("items");

      const clearRequest = objectStore.clear();
      clearRequest.onsuccess = async () => {
        await this.validateDefaultModels();
        resolve();
      };

      clearRequest.onerror = function (event) {
        reject("Error cleaning data");
      };
    });
  }

  public setKey(provider: string, key: string): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      if (!this.db) {
        reject("Database not initialized");
        return;
      }
      const transaction = this.db.transaction(["keys"], "readwrite");
      const objectStore = transaction.objectStore("keys");

      const objectRequest = objectStore.put({ provider, key });
      objectRequest.onsuccess = () => resolve();
      objectRequest.onerror = () => {
        reject(`Error adding key: ${provider}`);
      };
    });
  }

  public cleanKeys() {
    return new Promise<void>((resolve, reject) => {
      if (!this.db) {
        reject("Database not initialized");
        return;
      }

      const transaction = this.db.transaction(["keys"], "readwrite");
      const objectStore = transaction.objectStore("keys");

      const clearRequest = objectStore.clear();
      clearRequest.onsuccess = async () => {
        await this.validateDefaultModels();
        resolve();
      };

      clearRequest.onerror = function (event) {
        reject("Error cleaning keys data");
      };
    });
  }

  /**
   * Get all stored key objects
   * @returns 
   */
  public getAllKeys(): Promise<AIModelKey[]> {
    return new Promise<AIModelKey[]>((resolve, reject) => {
      if (!this.db) {
        reject("Database not initialized");
        return;
      }

      const transaction = this.db.transaction(["keys"], "readonly");
      const objectStore = transaction.objectStore("keys");
      const cursorRequest = objectStore.openCursor();
      const objects: AIModelKey[] = [];

      cursorRequest.onsuccess = (event: any) => {
        const cursor = event.target.result;
        if (cursor) {
          objects.push(cursor.value);
          cursor.continue();
        } else {
          resolve(objects);
        }
      };

      cursorRequest.onerror = () => {
        reject("Error getting key objects");
      };
    })
  }
}

export default ModelStorage.shared;
