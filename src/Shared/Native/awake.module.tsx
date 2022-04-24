import {NativeModules} from 'react-native';

interface AwakeModule {
  activate: () => void;
  deactivate: () => void;
}

export const awakeModule = NativeModules.AwakeModule as AwakeModule;

export const activateAwakeMode = () => {
  awakeModule.activate();
};

export const deactivateAwakeMode = () => {
  awakeModule.deactivate();
};
