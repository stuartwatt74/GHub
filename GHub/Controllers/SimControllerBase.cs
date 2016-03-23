using BulletSharp;
using GHub.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GHub.Controllers
{
    public class SimControllerBase : System.IDisposable
    {
        public DiscreteDynamicsWorld World { get; set; }
        public DefaultCollisionConfiguration CollisionConfiguration { get; set; }
        public CollisionDispatcher Dispatcher { get; set; }
        public SequentialImpulseConstraintSolver Solver { get; set; }
        public BroadphaseInterface Broadphase { get; set; }
        public List<CollisionShape> CollisionShapes { get; private set; }
        public float FPS { get; set; }

        public SimControllerBase(float fps)
        {
            this.CollisionShapes = new List<CollisionShape>();
            this.FPS = fps;
        }

        public virtual void Step()
        {
            try {
                this.World.StepSimulation(1 / this.FPS, 10);
            } catch (Exception ex)
            {

            }
        }

        public virtual RigidBody CreateRigidBody(float mass, Matrix startTransform, CollisionShape shape)
        {
            bool isDynamic = (mass != 0.0f);

            Vector3 localInertia = Vector3.Zero;
            if (isDynamic)
                shape.CalculateLocalInertia(mass, out localInertia);

            DefaultMotionState motionState = new DefaultMotionState(startTransform);

            RigidBodyConstructionInfo info = new RigidBodyConstructionInfo(mass, motionState, shape, localInertia);
            RigidBody body = new RigidBody(info);
            info.Dispose();

            this.World.AddRigidBody(body);

            return body;
        }
        
        public List<Model3D> GetModels()
        {
            List<Model3D> models = new List<Model3D>();
            foreach(RigidBody r in this.World.CollisionObjectArray)
            {
                BoxShape shape = (BoxShape)r.CollisionShape;

                Model3D model = new Model3D()
                {
                    X = r.CenterOfMassPosition.X,
                    Y = r.CenterOfMassPosition.Y,
                    Z = r.CenterOfMassPosition.Z,
                    RotationX = r.Orientation.X,
                    RotationY = r.Orientation.Y,
                    RotationZ = r.Orientation.Z,
                    SizeX = shape.HalfExtentsWithMargin.X * 2,
                    SizeY = shape.HalfExtentsWithMargin.Y * 2,
                    SizeZ = shape.HalfExtentsWithMargin.Z * 2,
                };

                models.Add(model);
            }
            return models;
        }

        public virtual void Dispose()
        {
            if (this.World != null)
            {
                // Remove and dispose of contraints
                for (int i = this.World.NumConstraints - 1; i >= 0; i--)
                {
                    TypedConstraint constraint = this.World.GetConstraint(i);
                    this.World.RemoveConstraint(constraint);
                    constraint.Dispose();
                }

                // Remove the rigid body object from the dynamics world and dispose of them
                for (int i = this.World.NumCollisionObjects - 1; i >= 0; i--)
                {
                    CollisionObject obj = this.World.CollisionObjectArray[i];
                    RigidBody body = obj as RigidBody;
                    if (body != null && body.MotionState != null)
                    {
                        body.MotionState.Dispose();
                    }
                    this.World.RemoveCollisionObject(obj);
                    obj.Dispose();
                }

                // Dispose of the collision shapes
                foreach (CollisionShape shape in this.CollisionShapes)
                {
                    shape.Dispose();
                }
                this.CollisionShapes.Clear();

                // Clean up
                this.World.Dispose();
                this.Broadphase.Dispose();
                this.Dispatcher.Dispose();
                this.Solver.Dispose();
                this.CollisionConfiguration.Dispose();

                if (this.Broadphase != null)
                {
                    this.Broadphase.Dispose();
                }
                if (this.Dispatcher != null)
                {
                    this.Dispatcher.Dispose();
                }
                if (this.Solver != null)
                {
                    this.Solver.Dispose();
                }
                if (this.CollisionConfiguration != null)
                {
                    this.CollisionConfiguration.Dispose();
                }
            }
        }
    }
}
