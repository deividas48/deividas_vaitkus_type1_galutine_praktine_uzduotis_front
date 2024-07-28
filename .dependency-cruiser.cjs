// .dependency-cruiser.js
module.exports = {
    forbidden: [
      {
        name: 'no-circular',
        severity: 'error',
        comment: 'This dependency is part of a circular relationship',
        from: {},
        to: {
          circular: true,
        },
      },
      {
        name: 'no-orphans',
        severity: 'warn',
        comment: 'This module appears to be orphaned',
        from: {
          orphan: true,
        },
        to: {},
      },
    ],
    options: {
      doNotFollow: {
        path: 'node_modules',
      },
      exclude: {
        path: 'node_modules',
      },
    },
  };
  