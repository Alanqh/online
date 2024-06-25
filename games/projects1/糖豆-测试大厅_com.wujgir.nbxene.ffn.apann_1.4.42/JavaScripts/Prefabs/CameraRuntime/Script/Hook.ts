/** 
 * @Author       : lei.zhao
 * @Date         : 2023-02-07 15:59:19
 * @LastEditors  : lei.zhao
 * @LastEditTime : 2023-02-16 16:44:11
 * @FilePath     : \IAADemo\Prefabs\CameraRuntime\Script\Hook.ts
 * @Description  : 修改描述
 */
declare namespace puerts {
    const argv: any;
    const $ref: any;
}
declare namespace UE {
    const SceneComponent: any;
    const CapsuleComponent: any;
    const EAttachmentRule: any;
    const KismetSystemLibrary: any;
    const ETraceTypeQuery: any;
    const EDrawDebugTrace: any;
    class Vector {
        X: number;
        Y: number;
        Z: number;
        constructor(InX: number, InY: number, InZ: number);
        ToString(): string;
        static CrossProduct(A: Vector, B: Vector): Vector;
        op_Subtraction(V: Vector): Vector;
        op_Addition(V: Vector): Vector;
        Rotation(): Rotator;
    }
    class Rotator {
        constructor(InPitch: number, InYaw: number, InRoll: number);
        ToString(): string;
        Quaternion(): Quat;
        RotateVector(V: Vector): Vector;
        Pitch: number;
        Yaw: number;
        Roll: number;
    }
    interface $Ref<T> {
        value: T
    }
    class Transform {

    }
    class Quat {
        constructor(R: Rotator);
        static Slerp(Quat1: Quat, Quat2: Quat, Slerp: number): Quat;
        Rotator(): Rotator;
        ToString(): string;
    }
    class Actor {
        K2_GetActorLocation(): Vector;
        K2_GetActorRotation(): Rotator;
        K2_OnReset(): void;
        K2_SetActorLocation(NewLocation: Vector, bSweep: boolean, SweepHitResult: $Ref<HitResult>, bTeleport: boolean): boolean;
        K2_SetActorLocationAndRotation(NewLocation: Vector, NewRotation: Rotator, bSweep: boolean, SweepHitResult: $Ref<HitResult>, bTeleport: boolean): boolean;
        K2_SetActorRelativeLocation(NewRelativeLocation: Vector, bSweep: boolean, SweepHitResult: $Ref<HitResult>, bTeleport: boolean): void;
        K2_SetActorRelativeRotation(NewRelativeRotation: Rotator, bSweep: boolean, SweepHitResult: $Ref<HitResult>, bTeleport: boolean): void;
        K2_SetActorRelativeTransform(NewRelativeTransform: Transform, bSweep: boolean, SweepHitResult: $Ref<HitResult>, bTeleport: boolean): void;
        K2_SetActorRotation(NewRotation: Rotator, bTeleportPhysics: boolean): boolean;
        K2_SetActorTransform(NewTransform: Transform, bSweep: boolean, SweepHitResult: $Ref<HitResult>, bTeleport: boolean): boolean;

    }
    class CameraComponent {
        K2_SetWorldLocation(NewLocation: Vector, bSweep: boolean, SweepHitResult: $Ref<HitResult>, bTeleport: boolean): void;
        K2_SetWorldLocationAndRotation(NewLocation: Vector, NewRotation: Rotator, bSweep: boolean, SweepHitResult: $Ref<HitResult>, bTeleport: boolean): void;
        K2_SetWorldRotation(NewRotation: Rotator, bSweep: boolean, SweepHitResult: $Ref<HitResult>, bTeleport: boolean): void;
        K2_GetComponentRotation(): Rotator;
        GetCameraRotation(): Rotator;
        K2_GetComponentLocation(): Vector;
        GetForwardVector(): Vector;
        K2_GetComponentRotation(): Rotator;
        K2_SetRelativeLocationAndRotation(NewLocation: Vector, NewRotation: Rotator, bSweep: boolean, SweepHitResult: $Ref<HitResult>, bTeleport: boolean): void;
        K2_SetWorldLocationAndRotation(NewLocation: Vector, NewRotation: Rotator, bSweep: boolean, SweepHitResult: $Ref<HitResult>, bTeleport: boolean): void;
        K2_SetWorldTransform(NewTransform: Transform, bSweep: boolean, SweepHitResult: $Ref<HitResult>, bTeleport: boolean): void;
        K2_GetComponentToWorld(): Transform;
        SnapTo(InParent: any, InSocketName?: string /* = "None" */): boolean;
    }
    class MWSysCEFollowTargetObject {
        TargetActor: Actor;
    }
    class MWSysCameraSystemComponent extends CameraComponent {
        GetCameraFollowTargetObject(): MWSysCEFollowTargetObject;
        SetFollowTarget(NewActor: Actor): void;
        ResetCameraLocationMode(): void;
        ResetCameraRotationMode(): void;
        ResetOverrideCameraRotation(): void;
        CancelFollowTarget(): void;
        static StaticClass(): any;
    }
    class HitResult {

    }

    const ECollisionEnabled: any
}
