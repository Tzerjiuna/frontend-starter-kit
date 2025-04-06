module.exports = {
  /** resolves from test to snapshot path */
  resolveSnapshotPath: (testPath, snapshotExtension) => {
    return testPath.replace('src', 'src/jest/__snapshots__') + snapshotExtension
  },

  /** resolves from snapshot to test path */
  resolveTestPath: (snapshotFilePath, snapshotExtension) => {
    return snapshotFilePath.replace('src/jest/__snapshots__/', 'src/').slice(0, -snapshotExtension.length)
  },
  testPathForConsistencyCheck: 'jest/__snapshots__/components/atoms/Button/index.spec.tsx'
}
