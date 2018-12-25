module.exports = function(source) {
    return 'export default "' + source.repeat(2) + '";';
};