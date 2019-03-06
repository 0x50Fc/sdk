
export function openGame(path: string, animated: boolean): void {
    app.open("@wx/page/game.js?path=" + encodeURIComponent(path), animated);
}
