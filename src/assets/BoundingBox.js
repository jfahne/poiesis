import { fabric } from "fabric";

export default function(canvas, toggle, history) {
    if (!toggle) {
        canvas.off('mouse:down').off('mouse:move').off('mouse:up');
        return;
    }
    let box, isDown, origX, origY;
    canvas.on('mouse:down', function(o) {
        isDown = true;
        let pointer = canvas.getPointer(o.e);
        origX = pointer.x;
        origY = pointer.y;
        pointer = canvas.getPointer(o.e);
        box = new fabric.Rect({
            left: origX,
            top: origY,
            fill: 'yellow',
            width: pointer.x - origX,
            height: pointer.y - origY,
            opacity: 0.5
        });
        canvas.add(box);
    });

    canvas.on('mouse:move', function(o) {
        if (!isDown) return;
        let pointer = canvas.getPointer(o.e);

        if (origX > pointer.x) {
            box.set({ left: pointer.x });
        }
        if (origY > pointer.y) {
            box.set({ top: pointer.y });
        }
        box.set({ width: pointer.x - origX });
        box.set({ height: pointer.y - origY });

        canvas.renderAll();
    });

    canvas.on('mouse:up', function() {
        isDown = false;
        history.push(JSON.stringify(canvas));
    });
    
}

// code from https://stackoverflow.com/questions/9417603/fabric-js-free-draw-a-rectangle