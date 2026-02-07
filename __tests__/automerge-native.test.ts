/**
 * Tests for react-native-automerge-generated native wrapper
 *
 * Tests the UseApi adapter with native Automerge implementation through
 * the @automerge/automerge/slim API to ensure all operations work correctly.
 */

import * as Automerge from '@automerge/automerge/slim';
import { UseApi } from '@automerge/automerge/slim';
import { nativeApi } from '../src/useapi-adapter';

// Initialize native API
UseApi(nativeApi);

describe('Native Automerge Wrapper', () => {
  describe('Document Creation', () => {
    it('should create an empty document', () => {
      const doc = Automerge.init();
      expect(doc).toBeDefined();
      expect(Automerge.getHeads(doc)).toBeDefined();
    });

    it('should create a document with custom actor ID', () => {
      const actorId = '0123456789abcdef0123456789abcdef';
      const doc = Automerge.init({ actorId });
      const heads = Automerge.getHeads(doc);
      expect(heads).toBeDefined();
    });
  });

  describe('Map Operations', () => {
    it('should set and get string properties', () => {
      let doc = Automerge.init<{ name: string }>();
      doc = Automerge.change(doc, d => {
        d.name = 'Alice';
      });
      expect(doc.name).toBe('Alice');
    });

    it('should set and get number properties', () => {
      let doc = Automerge.init<{ age: number; price: number }>();
      doc = Automerge.change(doc, d => {
        d.age = 30;
        d.price = 99.99;
      });
      expect(doc.age).toBe(30);
      expect(doc.price).toBe(99.99);
    });

    it('should set and get boolean properties', () => {
      let doc = Automerge.init<{ active: boolean }>();
      doc = Automerge.change(doc, d => {
        d.active = true;
      });
      expect(doc.active).toBe(true);
    });

    it('should handle null values', () => {
      let doc = Automerge.init<{ value: string | null }>();
      doc = Automerge.change(doc, d => {
        d.value = null;
      });
      expect(doc.value).toBeNull();
    });

    it('should delete properties', () => {
      let doc = Automerge.init<{ name?: string; age: number }>();
      doc = Automerge.change(doc, d => {
        d.name = 'Bob';
        d.age = 25;
      });
      doc = Automerge.change(doc, d => {
        delete d.name;
      });
      expect(doc.name).toBeUndefined();
      expect(doc.age).toBe(25);
    });

    it('should handle nested objects', () => {
      let doc = Automerge.init<{ user: { name: string; email: string } }>();
      doc = Automerge.change(doc, d => {
        d.user = { name: 'Alice', email: 'alice@example.com' };
      });
      expect(doc.user.name).toBe('Alice');
      expect(doc.user.email).toBe('alice@example.com');
    });
  });

  describe('List Operations', () => {
    it('should create and manipulate lists', () => {
      let doc = Automerge.init<{ items: string[] }>();
      doc = Automerge.change(doc, d => {
        d.items = [];
        d.items.push('apple');
        d.items.push('banana');
        d.items.push('cherry');
      });
      expect(doc.items).toEqual(['apple', 'banana', 'cherry']);
    });

    it('should insert items at specific positions', () => {
      let doc = Automerge.init<{ items: string[] }>();
      doc = Automerge.change(doc, d => {
        d.items = ['a', 'c'];
      });
      doc = Automerge.change(doc, d => {
        d.items.splice(1, 0, 'b');
      });
      expect(doc.items).toEqual(['a', 'b', 'c']);
    });

    it('should delete items from lists', () => {
      let doc = Automerge.init<{ items: string[] }>();
      doc = Automerge.change(doc, d => {
        d.items = ['a', 'b', 'c', 'd'];
      });
      doc = Automerge.change(doc, d => {
        d.items.splice(1, 2);
      });
      expect(doc.items).toEqual(['a', 'd']);
    });

    it('should handle lists of numbers', () => {
      let doc = Automerge.init<{ numbers: number[] }>();
      doc = Automerge.change(doc, d => {
        d.numbers = [1, 2, 3, 4, 5];
      });
      expect(doc.numbers).toEqual([1, 2, 3, 4, 5]);
    });

    it('should handle nested lists', () => {
      let doc = Automerge.init<{ matrix: number[][] }>();
      doc = Automerge.change(doc, d => {
        d.matrix = [[1, 2], [3, 4]];
      });
      expect(doc.matrix).toEqual([[1, 2], [3, 4]]);
    });
  });

  describe('Text Operations', () => {
    it('should create and manipulate text', () => {
      let doc = Automerge.init<{ text: Automerge.Text }>();
      doc = Automerge.change(doc, d => {
        d.text = new Automerge.Text('Hello');
      });
      expect(doc.text.toString()).toBe('Hello');
    });

    it('should insert text', () => {
      let doc = Automerge.init<{ text: Automerge.Text }>();
      doc = Automerge.change(doc, d => {
        d.text = new Automerge.Text('Hello');
      });
      doc = Automerge.change(doc, d => {
        d.text.insertAt(5, ' World');
      });
      expect(doc.text.toString()).toBe('Hello World');
    });

    it('should delete text', () => {
      let doc = Automerge.init<{ text: Automerge.Text }>();
      doc = Automerge.change(doc, d => {
        d.text = new Automerge.Text('Hello World');
      });
      doc = Automerge.change(doc, d => {
        d.text.deleteAt(5, 6);
      });
      expect(doc.text.toString()).toBe('Hello');
    });
  });

  describe('Counter Operations', () => {
    it('should create and increment counters', () => {
      let doc = Automerge.init<{ count: Automerge.Counter }>();
      doc = Automerge.change(doc, d => {
        d.count = new Automerge.Counter(0);
      });
      doc = Automerge.change(doc, d => {
        d.count.increment(5);
      });
      expect(doc.count.value).toBe(5);
    });

    it('should decrement counters', () => {
      let doc = Automerge.init<{ count: Automerge.Counter }>();
      doc = Automerge.change(doc, d => {
        d.count = new Automerge.Counter(10);
      });
      doc = Automerge.change(doc, d => {
        d.count.increment(-3);
      });
      expect(doc.count.value).toBe(7);
    });
  });

  describe('Save and Load', () => {
    it('should save and load documents', () => {
      let doc1 = Automerge.init<{ name: string; age: number }>();
      doc1 = Automerge.change(doc1, d => {
        d.name = 'Alice';
        d.age = 30;
      });

      const bytes = Automerge.save(doc1);
      expect(bytes).toBeInstanceOf(Uint8Array);
      expect(bytes.length).toBeGreaterThan(0);

      const doc2 = Automerge.load<{ name: string; age: number }>(bytes);
      expect(doc2.name).toBe('Alice');
      expect(doc2.age).toBe(30);
    });

    it('should preserve multiple changes in save/load', () => {
      let doc = Automerge.init<{ items: string[] }>();
      doc = Automerge.change(doc, d => {
        d.items = [];
      });
      doc = Automerge.change(doc, d => {
        d.items.push('a');
      });
      doc = Automerge.change(doc, d => {
        d.items.push('b');
      });

      const bytes = Automerge.save(doc);
      const loaded = Automerge.load<{ items: string[] }>(bytes);
      expect(loaded.items).toEqual(['a', 'b']);
    });
  });

  describe('Merge Operations', () => {
    it('should merge concurrent changes', () => {
      let doc1 = Automerge.init<{ x: number; y: number }>();
      doc1 = Automerge.change(doc1, d => {
        d.x = 1;
      });

      let doc2 = Automerge.clone(doc1);

      doc1 = Automerge.change(doc1, d => {
        d.x = 2;
      });

      doc2 = Automerge.change(doc2, d => {
        d.y = 3;
      });

      const merged = Automerge.merge(doc1, doc2);
      expect(merged.x).toBe(2);
      expect(merged.y).toBe(3);
    });

    it('should handle conflicting changes (last-write-wins)', () => {
      let doc1 = Automerge.init<{ value: string }>();
      doc1 = Automerge.change(doc1, d => {
        d.value = 'initial';
      });

      let doc2 = Automerge.clone(doc1);

      doc1 = Automerge.change(doc1, d => {
        d.value = 'from-doc1';
      });

      doc2 = Automerge.change(doc2, d => {
        d.value = 'from-doc2';
      });

      const merged = Automerge.merge(doc1, doc2);
      expect(merged.value).toBeDefined();
      expect(['from-doc1', 'from-doc2']).toContain(merged.value);
    });

    it('should merge list insertions', () => {
      let doc1 = Automerge.init<{ items: string[] }>();
      doc1 = Automerge.change(doc1, d => {
        d.items = [];
      });

      let doc2 = Automerge.clone(doc1);

      doc1 = Automerge.change(doc1, d => {
        d.items.push('a');
      });

      doc2 = Automerge.change(doc2, d => {
        d.items.push('b');
      });

      const merged = Automerge.merge(doc1, doc2);
      expect(merged.items.length).toBe(2);
      expect(merged.items).toContain('a');
      expect(merged.items).toContain('b');
    });
  });

  describe('Change History', () => {
    it('should track change history', () => {
      let doc = Automerge.init<{ count: number }>();
      doc = Automerge.change(doc, d => {
        d.count = 0;
      });
      doc = Automerge.change(doc, d => {
        d.count = 1;
      });
      doc = Automerge.change(doc, d => {
        d.count = 2;
      });

      const changes = Automerge.getChanges(Automerge.init(), doc);
      expect(changes.length).toBeGreaterThanOrEqual(3);
    });

    it('should apply changes incrementally', () => {
      let doc1 = Automerge.init<{ value: string }>();
      doc1 = Automerge.change(doc1, d => {
        d.value = 'hello';
      });

      const changes = Automerge.getChanges(Automerge.init(), doc1);

      let doc2 = Automerge.init<{ value: string }>();
      doc2 = Automerge.applyChanges(doc2, changes);

      expect(doc2.value).toBe('hello');
    });
  });

  describe('decodeChange', () => {
    it('should decode change metadata', () => {
      let doc = Automerge.init<{ name: string }>();
      doc = Automerge.change(doc, 'Set name', d => {
        d.name = 'Alice';
      });

      const changes = Automerge.getChanges(Automerge.init(), doc);
      expect(changes.length).toBeGreaterThan(0);

      const decoded = Automerge.decodeChange(changes[0]);
      expect(decoded).toBeDefined();
      expect(decoded.hash).toBeDefined();
      expect(decoded.actor).toBeDefined();
      expect(decoded.seq).toBeGreaterThan(0);
      expect(decoded.startOp).toBeGreaterThan(0);
      expect(decoded.time).toBeDefined();
      expect(decoded.deps).toBeInstanceOf(Array);
      expect(decoded.message).toBeDefined();
    });

    it('should decode multiple changes', () => {
      let doc = Automerge.init<{ count: number }>();
      doc = Automerge.change(doc, 'Init', d => {
        d.count = 0;
      });
      doc = Automerge.change(doc, 'Increment', d => {
        d.count = 1;
      });

      const changes = Automerge.getChanges(Automerge.init(), doc);
      expect(changes.length).toBeGreaterThanOrEqual(2);

      const decoded1 = Automerge.decodeChange(changes[0]);
      const decoded2 = Automerge.decodeChange(changes[1]);

      expect(decoded1.seq).toBeLessThan(decoded2.seq);
      expect(decoded2.deps).toContain(decoded1.hash);
    });
  });

  describe('Sync Protocol', () => {
    it('should generate sync messages', () => {
      let doc1 = Automerge.init<{ value: string }>();
      doc1 = Automerge.change(doc1, d => {
        d.value = 'hello';
      });

      const doc2 = Automerge.init<{ value: string }>();

      const syncState1 = Automerge.initSyncState();
      const syncState2 = Automerge.initSyncState();

      const [newSyncState1, msg1] = Automerge.generateSyncMessage(doc1, syncState1);
      expect(msg1).toBeInstanceOf(Uint8Array);
      expect(msg1.length).toBeGreaterThan(0);
      expect(newSyncState1).toBeDefined();
    });

    it('should receive sync messages', () => {
      let doc1 = Automerge.init<{ value: string }>();
      doc1 = Automerge.change(doc1, d => {
        d.value = 'hello';
      });

      let doc2 = Automerge.init<{ value: string }>();

      const syncState1 = Automerge.initSyncState();
      const syncState2 = Automerge.initSyncState();

      const [newSyncState1, msg1] = Automerge.generateSyncMessage(doc1, syncState1);
      if (msg1) {
        const [newDoc2, newSyncState2] = Automerge.receiveSyncMessage(doc2, syncState2, msg1);
        doc2 = newDoc2;
        expect(doc2.value).toBe('hello');
      }
    });

    it('should complete full sync cycle', () => {
      let doc1 = Automerge.init<{ a: number; b: number }>();
      doc1 = Automerge.change(doc1, d => {
        d.a = 1;
      });

      let doc2 = Automerge.init<{ a: number; b: number }>();
      doc2 = Automerge.change(doc2, d => {
        d.b = 2;
      });

      let syncState1 = Automerge.initSyncState();
      let syncState2 = Automerge.initSyncState();

      // Exchange messages until in sync
      let maxRounds = 10;
      while (maxRounds-- > 0) {
        let [newSyncState1, msg1] = Automerge.generateSyncMessage(doc1, syncState1);
        syncState1 = newSyncState1;

        if (msg1) {
          let [newDoc2, newSyncState2] = Automerge.receiveSyncMessage(doc2, syncState2, msg1);
          doc2 = newDoc2;
          syncState2 = newSyncState2;
        }

        let [newSyncState2, msg2] = Automerge.generateSyncMessage(doc2, syncState2);
        syncState2 = newSyncState2;

        if (msg2) {
          let [newDoc1, newSyncState1] = Automerge.receiveSyncMessage(doc1, syncState1, msg2);
          doc1 = newDoc1;
          syncState1 = newSyncState1;
        }

        if (!msg1 && !msg2) break;
      }

      expect(doc1.a).toBe(1);
      expect(doc1.b).toBe(2);
      expect(doc2.a).toBe(1);
      expect(doc2.b).toBe(2);
    });
  });

  describe('Heads and History', () => {
    it('should get document heads', () => {
      let doc = Automerge.init<{ value: number }>();
      doc = Automerge.change(doc, d => {
        d.value = 1;
      });

      const heads = Automerge.getHeads(doc);
      expect(heads).toBeInstanceOf(Array);
      expect(heads.length).toBeGreaterThan(0);
    });

    it('should compare heads', () => {
      let doc1 = Automerge.init<{ value: number }>();
      doc1 = Automerge.change(doc1, d => {
        d.value = 1;
      });

      const doc2 = Automerge.clone(doc1);

      const heads1 = Automerge.getHeads(doc1);
      const heads2 = Automerge.getHeads(doc2);

      expect(heads1).toEqual(heads2);
    });
  });

  describe('Complex Document Structures', () => {
    it('should handle deeply nested structures', () => {
      interface NestedDoc {
        level1: {
          level2: {
            level3: {
              value: string;
            };
          };
        };
      }

      let doc = Automerge.init<NestedDoc>();
      doc = Automerge.change(doc, d => {
        d.level1 = {
          level2: {
            level3: {
              value: 'deep'
            }
          }
        };
      });

      expect(doc.level1.level2.level3.value).toBe('deep');
    });

    it('should handle mixed types in lists', () => {
      let doc = Automerge.init<{ mixed: Array<string | number | boolean> }>();
      doc = Automerge.change(doc, d => {
        d.mixed = ['string', 42, true, 3.14];
      });

      expect(doc.mixed[0]).toBe('string');
      expect(doc.mixed[1]).toBe(42);
      expect(doc.mixed[2]).toBe(true);
      expect(doc.mixed[3]).toBe(3.14);
    });

    it('should handle arrays of objects', () => {
      interface Item {
        id: number;
        name: string;
      }

      let doc = Automerge.init<{ items: Item[] }>();
      doc = Automerge.change(doc, d => {
        d.items = [
          { id: 1, name: 'First' },
          { id: 2, name: 'Second' }
        ];
      });

      expect(doc.items.length).toBe(2);
      expect(doc.items[0].name).toBe('First');
      expect(doc.items[1].name).toBe('Second');
    });
  });

  describe('Actor ID', () => {
    it('should get actor ID from document', () => {
      const doc = Automerge.init();
      const actorId = Automerge.getActorId(doc);
      expect(actorId).toBeDefined();
      expect(typeof actorId).toBe('string');
      expect(actorId.length).toBeGreaterThan(0);
    });
  });

  describe('Clone', () => {
    it('should clone documents', () => {
      let doc1 = Automerge.init<{ value: string }>();
      doc1 = Automerge.change(doc1, d => {
        d.value = 'original';
      });

      const doc2 = Automerge.clone(doc1);
      expect(doc2.value).toBe('original');

      // Changes to clone shouldn't affect original
      let doc2Changed = Automerge.change(doc2, d => {
        d.value = 'modified';
      });

      expect(doc1.value).toBe('original');
      expect(doc2Changed.value).toBe('modified');
    });
  });

  describe('Empty Values', () => {
    it('should handle empty strings', () => {
      let doc = Automerge.init<{ text: string }>();
      doc = Automerge.change(doc, d => {
        d.text = '';
      });
      expect(doc.text).toBe('');
    });

    it('should handle empty arrays', () => {
      let doc = Automerge.init<{ items: string[] }>();
      doc = Automerge.change(doc, d => {
        d.items = [];
      });
      expect(doc.items).toEqual([]);
    });

    it('should handle empty objects', () => {
      let doc = Automerge.init<{ obj: Record<string, any> }>();
      doc = Automerge.change(doc, d => {
        d.obj = {};
      });
      expect(Object.keys(doc.obj)).toEqual([]);
    });
  });
});
