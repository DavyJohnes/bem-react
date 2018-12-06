import * as React from 'react';
import {ClassNameFormatter, NoStrictEntityMods} from '@bem-react/classname';
import {IClassNameProps} from '@bem-react/core';

export type MapPropsToMods<P> = (props: P) => NoStrictEntityMods;

export const bemEntity = <P extends {}>(cn: ClassNameFormatter, mapPropsToMods: MapPropsToMods<P> | null = null, tag: string = 'div') => {
    return (target: React.ComponentType<P>): React.ComponentType<P & IClassNameProps> => {
        return props => {
            const {className, ...passProps} = props;

            return React.createElement(tag, {
                className: cn(mapPropsToMods && mapPropsToMods(passProps), className),
            }, React.createElement(target, passProps));
        };
    };
};
