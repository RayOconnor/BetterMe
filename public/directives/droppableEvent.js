(function () {
  angular
    .module("BetterMe")
    .directive("droppableEvent", droppableEvent)

  function droppableEvent() {
    function linkFunc(scope, element) {
      element.draggable({
        revert: true,      // immediately snap back to original position
        revertDuration: 0  //
      });
      element.data('event', {title: 'my event'});
    }
    return {
      link: linkFunc
    };

  }
})();