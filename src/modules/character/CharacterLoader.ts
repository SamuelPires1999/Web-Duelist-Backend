import { createLoader } from '@entria/graphql-mongo-helpers';

import { registerLoader } from '../loader/loaderRegister';

import CharacterModel from './CharacterModel';

const {
  Wrapper: Character,
  getLoader,
  clearCache,
  load,
  loadAll,
} = createLoader({
  model: CharacterModel,
  loaderName: 'CharacterLoader',
});

export { getLoader, clearCache, load, loadAll };
export default Character;

registerLoader('CharacterLoader', getLoader);