import { afterEach, beforeEach } from './lib';

function generateRecordingName(context) {
  const { currentTest } = context;
  const parts = [currentTest.title];
  let parent = currentTest.parent;

  while (parent && parent.title) {
    parts.push(parent.title);
    parent = parent.parent;
  }

  return parts.reverse().join('/');
}

export default function setupMocha(defaults = {}, ctx = self) {
  setupMocha.beforeEach(defaults, ctx);
  setupMocha.afterEach(ctx);
}

setupMocha.beforeEach = function setupMochaBeforeEach(defaults, ctx = self) {
  ctx.beforeEach(function() {
    return beforeEach(this, generateRecordingName(this), defaults);
  });
};

setupMocha.afterEach = function setupMochaAfterEach(ctx = self) {
  ctx.afterEach(function() {
    return afterEach(this, 'mocha');
  });
};
