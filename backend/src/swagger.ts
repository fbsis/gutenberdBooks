export const swaggerDocument = {
  openapi: '3.0.0',
  info: {
    title: 'Gutenberg API',
    description: 'API for managing books in the Gutenberg project',
    version: '1.0.0',
    contact: {
      name: 'Felipe Braga',
      email: 'contact@felipebraga.dev'
    }
  },
  servers: [
    {
      url: 'http://localhost:4000',
      description: 'Development server',
    },
  ],
  paths: {
    '/books/{id}': {
      get: {
        tags: ['Books'],
        summary: 'Get a book by ID',
        description: 'Returns a specific book based on the provided ID',
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            description: 'Book ID',
            schema: {
              type: 'string',
            },
          },
        ],
        responses: {
          '200': {
            description: 'Book found successfully',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    id: {
                      type: 'string',
                      example: '1',
                    },
                    title: {
                      type: 'string',
                      example: 'Dom Casmurro',
                    },
                    author: {
                      type: 'string',
                      example: 'Machado de Assis',
                    },
                    year: {
                      type: 'number',
                      example: 1899,
                    },
                  },
                },
              },
            },
          },
          '404': {
            description: 'Book not found',
          },
        },
      },
    },
  },
}; 