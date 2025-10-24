import { expect } from '@jest/globals'

import { Node, renderBlock } from '../src'

describe('renderBlock - Nested Lists', () => {
  it('Test Case 1: Nested Unordered Lists', () => {
    const block: Node[] = [
      {
        "type": "list",
        "format": "unordered",
        "children": [
          {
            "type": "list-item",
            "children": [
              {
                "type": "text",
                "text": "Parent Item 1"
              }
            ]
          },
          {
            "type": "list",
            "format": "unordered",
            "children": [
              {
                "type": "list-item",
                "children": [
                  {
                    "type": "text",
                    "text": "Nested Item 1.1"
                  }
                ]
              },
              {
                "type": "list-item",
                "children": [
                  {
                    "type": "text",
                    "text": "Nested Item 1.2"
                  }
                ]
              }
            ]
          },
          {
            "type": "list-item",
            "children": [
              {
                "type": "text",
                "text": "Parent Item 2"
              }
            ]
          }
        ]
      }
    ];

    const expectedHTML = '<ul><li>Parent Item 1<ul><li>Nested Item 1.1</li><li>Nested Item 1.2</li></ul></li><li>Parent Item 2</li></ul>';

    const result = renderBlock(block);
    expect(result).toEqual(expectedHTML);
  });

  it('Test Case 2: Nested Ordered Lists', () => {
    const block: Node[] = [
      {
        "type": "list",
        "format": "ordered",
        "children": [
          {
            "type": "list-item",
            "children": [
              {
                "type": "text",
                "text": "First Step"
              }
            ]
          },
          {
            "type": "list",
            "format": "ordered",
            "children": [
              {
                "type": "list-item",
                "children": [
                  {
                    "type": "text",
                    "text": "Sub-step 1.1"
                  }
                ]
              },
              {
                "type": "list-item",
                "children": [
                  {
                    "type": "text",
                    "text": "Sub-step 1.2"
                  }
                ]
              }
            ]
          },
          {
            "type": "list-item",
            "children": [
              {
                "type": "text",
                "text": "Second Step"
              }
            ]
          }
        ]
      }
    ];

    const expectedHTML = '<ol><li>First Step<ol><li>Sub-step 1.1</li><li>Sub-step 1.2</li></ol></li><li>Second Step</li></ol>';

    const result = renderBlock(block);
    expect(result).toEqual(expectedHTML);
  });

  it('Test Case 3: Mixed Nesting (Ordered within Unordered)', () => {
    const block: Node[] = [
      {
        "type": "list",
        "format": "unordered",
        "children": [
          {
            "type": "list-item",
            "children": [
              {
                "type": "text",
                "text": "Bullet Point 1"
              }
            ]
          },
          {
            "type": "list",
            "format": "ordered",
            "children": [
              {
                "type": "list-item",
                "children": [
                  {
                    "type": "text",
                    "text": "Numbered Sub-item A"
                  }
                ]
              },
              {
                "type": "list-item",
                "children": [
                  {
                    "type": "text",
                    "text": "Numbered Sub-item B"
                  }
                ]
              }
            ]
          },
          {
            "type": "list-item",
            "children": [
              {
                "type": "text",
                "text": "Bullet Point 2"
              }
            ]
          }
        ]
      }
    ];

    const expectedHTML = '<ul><li>Bullet Point 1<ol><li>Numbered Sub-item A</li><li>Numbered Sub-item B</li></ol></li><li>Bullet Point 2</li></ul>';

    const result = renderBlock(block);
    expect(result).toEqual(expectedHTML);
  });

  it('Test Case 4: Deep Nesting with indentLevel', () => {
    const block: Node[] = [
      {
        "type": "list",
        "format": "unordered",
        "indentLevel": 0,
        "children": [
          {
            "type": "list-item",
            "children": [
              {
                "type": "text",
                "text": "Level 1 Item"
              }
            ]
          },
          {
            "type": "list",
            "format": "unordered",
            "indentLevel": 1,
            "children": [
              {
                "type": "list-item",
                "children": [
                  {
                    "type": "text",
                    "text": "Level 2 Item"
                  }
                ]
              },
              {
                "type": "list",
                "format": "unordered",
                "indentLevel": 2,
                "children": [
                  {
                    "type": "list-item",
                    "children": [
                      {
                        "type": "text",
                        "text": "Level 3 Item"
                      }
                    ]
                  }
                ]
              }
            ]
          }
        ]
      }
    ];

    const expectedHTML = '<ul><li>Level 1 Item<ul><li>Level 2 Item<ul><li>Level 3 Item</li></ul></li></ul></li></ul>';

    const result = renderBlock(block);
    expect(result).toEqual(expectedHTML);
  });

  it('Test Case 5: Multiple nested lists in same parent', () => {
    const block: Node[] = [
      {
        "type": "list",
        "format": "unordered",
        "children": [
          {
            "type": "list-item",
            "children": [
              {
                "type": "text",
                "text": "Item 1"
              }
            ]
          },
          {
            "type": "list",
            "format": "unordered",
            "children": [
              {
                "type": "list-item",
                "children": [
                  {
                    "type": "text",
                    "text": "Nested 1.1"
                  }
                ]
              }
            ]
          },
          {
            "type": "list-item",
            "children": [
              {
                "type": "text",
                "text": "Item 2"
              }
            ]
          },
          {
            "type": "list",
            "format": "unordered",
            "children": [
              {
                "type": "list-item",
                "children": [
                  {
                    "type": "text",
                    "text": "Nested 2.1"
                  }
                ]
              }
            ]
          }
        ]
      }
    ];

    const expectedHTML = '<ul><li>Item 1<ul><li>Nested 1.1</li></ul></li><li>Item 2<ul><li>Nested 2.1</li></ul></li></ul>';

    const result = renderBlock(block);
    expect(result).toEqual(expectedHTML);
  });

  it('Test Case 6: List with formatted text in nested items', () => {
    const block: Node[] = [
      {
        "type": "list",
        "format": "unordered",
        "children": [
          {
            "type": "list-item",
            "children": [
              {
                "type": "text",
                "text": "Parent with ",
              },
              {
                "type": "text",
                "text": "bold text",
                "bold": true
              }
            ]
          },
          {
            "type": "list",
            "format": "unordered",
            "children": [
              {
                "type": "list-item",
                "children": [
                  {
                    "type": "text",
                    "text": "Nested with ",
                  },
                  {
                    "type": "text",
                    "text": "italic",
                    "italic": true
                  },
                  {
                    "type": "text",
                    "text": " text"
                  }
                ]
              }
            ]
          }
        ]
      }
    ];

    const expectedHTML = '<ul><li>Parent with <strong>bold text</strong><ul><li>Nested with <em>italic</em> text</li></ul></li></ul>';

    const result = renderBlock(block);
    expect(result).toEqual(expectedHTML);
  });
});
