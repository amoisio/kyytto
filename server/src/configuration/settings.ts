import { join } from 'path';
import { Low, JSONFile } from 'lowdb'
import { SettingsDb } from './db-model.js';

const settingsFileName: string = 'k-settings.json';

export class Settings {
  private readonly db: Low<SettingsDb>;

  private constructor(db: Low<SettingsDb>) { 
    this.db = db;
  }

  public static async openContext(): Promise<Settings> {
    const __dirname = process.cwd();
    const __dataFolder = 'data';
    const filePath = join(__dirname, __dataFolder, settingsFileName);
    const adapter = new JSONFile<SettingsDb>(filePath);
    const db = new Low<SettingsDb>(adapter);
    await db.read();
    this.initDb(db);
    return new Settings(db);
  }

  private static initDb(db: Low<SettingsDb>): void {
    db.data ||= {
      cors: []
    };
  }

  public get cors(): string[] {
    return this.db.data!.cors.map(c => c);
  }
  
  public async closeContext(): Promise<void> { 
    await this.db.write();
  }
}
