# About me
1. PhD student in Computationa Science and Engineering.
2. I work in these fields:
    * GPU Algorithms,
    * Computer Vision,
    * Reinforcement Learning,
    * Mechanics of Growth.
3. I am familiar with these languages:
    * Julia,
    * C++,
    * Python,
    * Visual Basic,
    * Javascript,
    * Compute Clusters and Slurm.
4. I have experience in CUDA, WebGL and MPI.

# `terrain-ops`

### Situatuion
1. Developing a spy-sim that learns a multi-agent strategy using reinforcement learning.
2. Convert existing CPU code to use CUDA to enable a larger scale of simulations.

### Task
1. Port player motion system from serial CPU to `CUDA` parallel.
2. Develop RL models for QRL systems that generate strategy.

### Action
1. CPU --> GPU done.
2. Implemented a Q-value grid generation that mimics a partial neural network on `CUDA`.
3. Implemented atomics for synchronized decision making between threads.
4. Collaborated with CUDA expert on kernel optimizations.
5. Built a `\epsilon-greedy` function on `CUDA` kernels.  
### Result
1. Now code runs `n`x faster, where `n` is number or players (parallel).
2. Demonstrated sparse-communication network coordination capabilities through `CUDA` shared memory.

# `Blob Detectors`

### Situatuion
1. Track skin as it moves when a joint moves.
2. Generate point cloud for the motion. 
3. Estimate Finite Strains/Stresses on the skin.

### Task
1. Detect blobs using CUDA kernels.
2. Match and trangulate blobs to calculate 3D positions.
3. Cluster points across timeframes.
4. Form the matrix to calculate lagrangian strains.

### Action
1. Algorithm for blob detection on several frames per CUDA call. 
1. Create `CUDA` kernels that does gaussian and laplacian of gaussians, with coalescing access. Existing papers don't talk about image sizes that are not a multiple of warp size.
2. Create `CUDA` kernels that calculate local extrema with `Intruction Level Parallelism`.
3. Create `CUDA` kernels that calculate feature vector histogram around the detected blobs.
4. Parallelized mean and variance calculation on these feature vectors using warp intrinsics.
5. Optimzed kernels for occupancy, issued warps per scheduler and block limits. Also used register unblocking to increase the latter.

### Result
1. Massively parallel algorithm that code that scales linearly upto 512 frames/cuda call.
2. 94% achieved occupancy.
2. `20x` speedup over numpy/scipy code on CPU.

# `CUDA Bitonic Sort`

### Situatuion
1. Existing CPU-based bitonic sort implementations were inefficient for large-scale datasets.
2. Memory transfers between CPU and GPU created bottlenecks in preliminary GPU implementations.
3. Traditional bitonic sort kernels suffered from low thread utilization (50% idle threads after mem-load).
### Task
1. Design a GPU-optimized bitonic sort algorithm with full thread participation.
2. Minimize host-device memory transfer latency.
3. Achieve >90% GPU occupancy and >1000 million elements per second (MEPS) throughput.
4. Implement architecture-specific optimizations for L40S and H100 GPUs.
### Action
1. Shared Memory Kernel: Coalesced memory access for jumps ≤ block size (2 elements/thread).
2. Global Memory Kernel: Divergence-free swaps using arithmetic predicates instead of conditionals.
3. Created a unified indexing function with bitwise operator that ensures all threads participate.
4. Packed 32-bit elements into 16-bit using SIMD AVX-512, reducing transfer volume by 50%.
5. Achieved 780 MEPS transfer rates via cudaHostRegister().
6. Eliminated control-flow divergence via delta-swap arithmetic
    ```cpp
    delta = (a[i] - a[ixj]) * ((i & mask) ? (a[i] < a[ixj]) : (a[i] > a[ixj]));
    ```
7. Maximized warp occupancy (91.32% on L40S) by minimizing register usage.
### Result
1. Throughput: 1,064 MEPS on H100 (160x faster than CPU), 910 MEPS on L40S.
2. Memory Transfer: Reduced H2D latency to 2.43 ms for 10M elements. (Latency hiding)
3. Achieved 91.32% occupancy on L40S and 85.81% occupancy on H100.
4. First-known divergence-free bitonic swap implementation using arithmetic masking.