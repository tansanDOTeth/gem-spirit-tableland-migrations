const SQL_TYPES_TEXT = 'TEXT';
const SQL_TYPES_INTEGER = 'INTEGER';

const createSchema = (columns, uniqueConstraint = undefined) => {
  const decoratedColumns = [
    ['id', `${SQL_TYPES_INTEGER} PRIMARY KEY`],
    ...columns,
    ['created_at', SQL_TYPES_INTEGER],
    ['updated_at', SQL_TYPES_INTEGER]
  ];

  if (uniqueConstraint) {
    const { indexName, columns } = uniqueConstraint;
    return `${decoratedColumns.flatMap(([columnName, columnType]) => `${columnName} ${columnType}`).join(', ')}, CONSTRAINT ${indexName} UNIQUE (${columns.join(', ')})`
  }
  return `${decoratedColumns.flatMap(([columnName, columnType]) => `${columnName} ${columnType}`).join(', ')}`
}

export const tables = [
  {
    "prefix": "Generations",
    "schema": createSchema([
      ['name', SQL_TYPES_TEXT],
    ])
  },
  {
    "prefix": "Stages",
    "schema": createSchema(
      [
        ['generation_id', SQL_TYPES_INTEGER],
        ['stage_parent_id', SQL_TYPES_INTEGER]
      ]
    )
  },
  {
    "prefix": "StageSpirits",
    "schema": createSchema(
      [
        ['stage_id', SQL_TYPES_INTEGER],
        ['spirit_id', SQL_TYPES_INTEGER],
      ],
      {
        indexName: 'unique_spirit_per_stage',
        columns: [
          'stage_id',
          'spirit_id'
        ]
      }
    )
  },
  {
    "prefix": "Spirits",
    "schema": createSchema(
      [
        ['sprite_sheet_uri', SQL_TYPES_TEXT],
        ['sprite_sheet_version_id', SQL_TYPES_INTEGER],
      ],
      {
        indexName: 'unique_sprite_sheet_uri_per_spirit',
        columns: [
          'sprite_sheet_uri'
        ]
      }
    )
  },
  {
    "prefix": "SpriteSheetVersion",
    "schema": createSchema(
      [
        ['sprite_width_px', SQL_TYPES_INTEGER],
        ['sprite_height_px', SQL_TYPES_INTEGER],
      ]
    )
  },
  {
    "prefix": "SpriteAttributes",
    "schema": createSchema(
      [
        ['spirit_id', SQL_TYPES_INTEGER],
        ['trait_name', SQL_TYPES_TEXT],
        ['variation_name', SQL_TYPES_TEXT],
      ],
      {
        indexName: 'unique_traits_per_spirit',
        columns: [
          'spirit_id',
          'trait_name',
          'variation_name',
        ]
      }
    )
  },
]