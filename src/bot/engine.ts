
interface Engine {
    start: () => Promise<void> | void,
    stop: () => Promise<void> | void
}