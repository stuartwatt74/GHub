using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using BulletSharp;

namespace GHub.Controllers
{
    public class SimController : SimControllerBase
    {        
        public SimController(float fps) : base(fps)
        {            
            this.Broadphase = new DbvtBroadphase();
            this.CollisionConfiguration = new DefaultCollisionConfiguration();
            this.Dispatcher = new CollisionDispatcher(this.CollisionConfiguration);
            this.Solver = new SequentialImpulseConstraintSolver();
            
            this.World = new DiscreteDynamicsWorld(this.Dispatcher, this.Broadphase, this.Solver, this.CollisionConfiguration);
            this.World.Gravity = new Vector3(0, -10, 0);

            BoxShape groundShape = new BoxShape(10, 1, 10);
            CollisionShapes.Add(groundShape);
            CollisionObject ground = CreateRigidBody(0, Matrix.Translation(-1.5f, 0, 0), groundShape);
            ground.UserObject = "ground";

            const float mass = 1.0f;

            BoxShape boxShape = new BoxShape(1);
            CollisionShapes.Add(boxShape);
            Matrix startTransform = Matrix.Translation(0, 0, 0);

            Quaternion q = Quaternion.RotationYawPitchRoll(0.2f, 0.3f, 0.1f);
            startTransform = Matrix.RotationQuaternion(q);

            RigidBody box = CreateRigidBody(mass, startTransform, boxShape);
            box.UserObject = "box";
            box.Translate(new Vector3(0, 30, 0));
        }

        public override void Step()
        {
            base.Step();            
        }

        
    }
}
