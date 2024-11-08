const StorageController = (function(){
    function get(item) {
        return localStorage.getItem(item);
    }

    function getParsed(item) {
        return JSON.parse(localStorage.getItem(item));
    }

    function set(key, item) {
        localStorage.setItem(key, JSON.stringify(item));
    }

    function setStringify(key, item) {
        localStorage.setItem(key, JSON.stringify(item));
    }

    return {
        get,
        getParsed,
        set,
        setStringify
    }
})();

export default StorageController;