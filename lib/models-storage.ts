import { AIModel } from "./types";

class ModelStorage {
  private static instance: ModelStorage;

  private db?: IDBDatabase;

  /**
   * Private constructor to initialize singleton instance
   */
  private constructor() {
    const request = indexedDB.open("jae-models", 1);

    request.onerror = (event) => {
      console.error("Error opening database");
    };

    request.onupgradeneeded = (event: IDBVersionChangeEvent) => {
      this.db = request.result;
      const objectStore = this.db.createObjectStore("items", { keyPath: "name" });
    };

    request.onsuccess = (event) => {
      this.db = request.result;
    };

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
          resolve(objects);
        }
      };

      cursorRequest.onerror = () => {
        reject("Error getting objects");
      };
    })
  }
}

export default ModelStorage.shared;
