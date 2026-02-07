/**
 * Created by hoho on 2018. 8. 1..
 */
import { CONTEXT_ITEM_CLICKED } from 'api/constants';
import LA$ from 'utils/likeA$';
import OvenTemplate from 'view/engine/OvenTemplate';

const ContextPanel = function($container, api, position){
    const $root = LA$(api.getContainerElement());

    const onRendered = function($current, template){
        const panelWidth = $current.width();
        const panelHeight = $current.height();

        const x = Math.min(position.pageX - $root.offset().left, $root.width() - panelWidth);
        const y = Math.min(position.pageY - $root.offset().top, $root.height() - panelHeight);

        $current.css("left" , x + "px");
        $current.css("top" , y + "px");
    };
    const onDestroyed = function(){
        //Do nothing.
    };
    const events = {
        "click .op-context-item" : function(event, $current, template){
            event.preventDefault();
            const item = $current.find('.op-context-item').get();
            const contextItem = Array.from((item instanceof NodeList) ? item : [item], LA$).find(
                (item) => item.contains(event.target) || item.get() == event.target
            );
            const ident = contextItem?.attr('id');
            if (ident == 'context-player-about') {
                window.open('https://github.com/AirenSoft/OvenPlayer', '_blank');
                return;
            }
            api.getProvider().trigger(CONTEXT_ITEM_CLICKED, ident);
        },
    };

    return OvenTemplate($container, "ContextPanel", api.getConfig(), api.getConfig().contextItems, events, onRendered, onDestroyed );

};

export default ContextPanel;
