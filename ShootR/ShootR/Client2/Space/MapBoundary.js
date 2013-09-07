/// <reference path="../../Scripts/endgate-0.2.0-beta1.d.ts" />
/// <reference path="../Ships/Ship.ts" />
/// <reference path="Map.ts" />
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var ShootR;
(function (ShootR) {
    var MapBoundary = (function (_super) {
        __extends(MapBoundary, _super);
        function MapBoundary(from, to) {
            this.Graphic = new eg.Graphics.Line2d(from.X, from.Y, to.X, to.Y, 1, MapBoundary.Color);

            _super.call(this, this.Graphic.GetDrawBounds());

            this.Graphic.LineWidth = MapBoundary.BoundaryWidth;

            if (from.X - to.X === 0) {
                this._bounceMultiplier = new eg.Vector2d(-ShootR.Map.BARRIER_DEPRECATION, ShootR.Map.BARRIER_DEPRECATION);
            } else {
                this._bounceMultiplier = new eg.Vector2d(ShootR.Map.BARRIER_DEPRECATION, -ShootR.Map.BARRIER_DEPRECATION);
            }
        }
        MapBoundary.prototype.Collided = function (data) {
            if (data.With instanceof ShootR.Ship) {
                this.HandleShipCollision(data.With);
            }
            // TODO: Add bullet
        };

        MapBoundary.prototype.HandleShipCollision = function (ship) {
            var bounceMultiplier, side = this.Graphic.From.Subtract(this.Graphic.To);

            ship.MovementController.StopAllMovement();
            ship.AnimationHandler.StopAllAnimations();

            this.RepositionShipInBounds(ship);

            // Reverse velocity, aka bounce
            ship.MovementController.Forces = ship.MovementController.Forces.Multiply(this._bounceMultiplier);
            ship.MovementController.Velocity = ship.MovementController.Velocity.Multiply(this._bounceMultiplier);
        };

        // Ugly
        MapBoundary.prototype.RepositionShipInBounds = function (ship) {
            if (ship.MovementController.Position.X - ShootR.Ship.SIZE.HalfWidth < 0) {
                ship.MovementController.Position.X = ShootR.Ship.SIZE.HalfWidth;
            } else if (ship.MovementController.Position.X + ShootR.Ship.SIZE.HalfWidth > ShootR.Map.SIZE.Width) {
                ship.MovementController.Position.X = ShootR.Map.SIZE.Width - ShootR.Ship.SIZE.HalfWidth;
            }

            if (ship.MovementController.Position.Y - ShootR.Ship.SIZE.HalfHeight < 0) {
                ship.MovementController.Position.Y = ShootR.Ship.SIZE.HalfHeight;
            } else if (ship.MovementController.Position.Y + ShootR.Ship.SIZE.HalfHeight > ShootR.Map.SIZE.Height) {
                ship.MovementController.Position.Y = ShootR.Map.SIZE.Height - ShootR.Ship.SIZE.HalfHeight;
            }
        };
        MapBoundary.Color = eg.Graphics.Color.FromHex("#3fa9f5");
        MapBoundary.BoundaryWidth = 5;
        return MapBoundary;
    })(eg.Collision.Collidable);
    ShootR.MapBoundary = MapBoundary;
})(ShootR || (ShootR = {}));
//# sourceMappingURL=MapBoundary.js.map
