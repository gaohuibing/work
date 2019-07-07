<template>
  <div>
    <el-dialog title="选择配送区域" :visible.sync="dialogVisible" width="60%">
      <div class="area-list">
        <!-- 1 -->
        <div class="area-item">
          <div class="left-check">
            <p-check class="p-svg p-curve" color="success" v-model="dbcheck">
              <svg slot="extra" class="svg svg-icon" viewBox="0 0 20 20">
                <path
                  d="M7.629,14.566c0.125,0.125,0.291,0.188,0.456,0.188c0.164,0,0.329-0.062,0.456-0.188l8.219-8.221c0.252-0.252,0.252-0.659,0-0.911c-0.252-0.252-0.659-0.252-0.911,0l-7.764,7.763L4.152,9.267c-0.252-0.251-0.66-0.251-0.911,0c-0.252,0.252-0.252,0.66,0,0.911L7.629,14.566z"
                  style="stroke: white;fill:white"
                />
              </svg>
              东北
            </p-check>
          </div>
          <div class="right-check">
            <template v-for="(item,index) in region.db">
              <el-popover
                placement="bottom-start"
                width="100"
                trigger="click"
                :key="index"
                class="area-p"
              >
                <div style="display:flex;justify-content: center;flex-direction: column">
                  <template v-if="item.children">
                    <template v-for="(value,key) in item.children">
                      <p-check
                        class="p-svg p-curve"
                        color="success"
                        slot="reference"
                        v-model="value.checked"
                        :key="key"
                        style="margin:4px 0"
                      >
                        <svg slot="extra" class="svg svg-icon" viewBox="0 0 20 20">
                          <path
                            d="M7.629,14.566c0.125,0.125,0.291,0.188,0.456,0.188c0.164,0,0.329-0.062,0.456-0.188l8.219-8.221c0.252-0.252,0.252-0.659,0-0.911c-0.252-0.252-0.659-0.252-0.911,0l-7.764,7.763L4.152,9.267c-0.252-0.251-0.66-0.251-0.911,0c-0.252,0.252-0.252,0.66,0,0.911L7.629,14.566z"
                            style="stroke: white;fill:white"
                          />
                        </svg>
                        {{value.label}}
                      </p-check>
                    </template>
                  </template>
                </div>

                <div slot="reference">
                  <p-check class="p-svg p-curve" color="success" v-model="item.checked">
                    <svg slot="extra" class="svg svg-icon" viewBox="0 0 20 20">
                      <path
                        d="M7.629,14.566c0.125,0.125,0.291,0.188,0.456,0.188c0.164,0,0.329-0.062,0.456-0.188l8.219-8.221c0.252-0.252,0.252-0.659,0-0.911c-0.252-0.252-0.659-0.252-0.911,0l-7.764,7.763L4.152,9.267c-0.252-0.251-0.66-0.251-0.911,0c-0.252,0.252-0.252,0.66,0,0.911L7.629,14.566z"
                        style="stroke: white;fill:white"
                      />
                    </svg>
                  </p-check>
                  <span style="cursor:pointer">{{item.label}}</span>
                  <i class="el-icon-arrow-down" style="cursor:pointer"></i>
                </div>
              </el-popover>
            </template>
          </div>
        </div>
        <!-- 2 -->
        <div class="area-item">
          <div class="left-check">
            <p-check class="p-svg p-curve" color="success" v-model="hdcheck">
              <svg slot="extra" class="svg svg-icon" viewBox="0 0 20 20">
                <path
                  d="M7.629,14.566c0.125,0.125,0.291,0.188,0.456,0.188c0.164,0,0.329-0.062,0.456-0.188l8.219-8.221c0.252-0.252,0.252-0.659,0-0.911c-0.252-0.252-0.659-0.252-0.911,0l-7.764,7.763L4.152,9.267c-0.252-0.251-0.66-0.251-0.911,0c-0.252,0.252-0.252,0.66,0,0.911L7.629,14.566z"
                  style="stroke: white;fill:white"
                />
              </svg>
              华东
            </p-check>
          </div>
          <div class="right-check">
            <template v-for="(item,index) in region.hd">
              <el-popover
                placement="bottom-start"
                width="100"
                trigger="click"
                :key="index"
                class="area-p"
              >
                <div style="display:flex;justify-content: center;flex-direction: column">
                  <template v-if="item.children">
                    <template v-for="(value,key) in item.children">
                      <p-check
                        class="p-svg p-curve"
                        color="success"
                        slot="reference"
                        v-model="value.checked"
                        :key="key"
                        style="margin:4px 0"
                      >
                        <svg slot="extra" class="svg svg-icon" viewBox="0 0 20 20">
                          <path
                            d="M7.629,14.566c0.125,0.125,0.291,0.188,0.456,0.188c0.164,0,0.329-0.062,0.456-0.188l8.219-8.221c0.252-0.252,0.252-0.659,0-0.911c-0.252-0.252-0.659-0.252-0.911,0l-7.764,7.763L4.152,9.267c-0.252-0.251-0.66-0.251-0.911,0c-0.252,0.252-0.252,0.66,0,0.911L7.629,14.566z"
                            style="stroke: white;fill:white"
                          />
                        </svg>
                        {{value.label}}
                      </p-check>
                    </template>
                  </template>
                </div>

                <div slot="reference">
                  <p-check class="p-svg p-curve" color="success" v-model="item.checked">
                    <svg slot="extra" class="svg svg-icon" viewBox="0 0 20 20">
                      <path
                        d="M7.629,14.566c0.125,0.125,0.291,0.188,0.456,0.188c0.164,0,0.329-0.062,0.456-0.188l8.219-8.221c0.252-0.252,0.252-0.659,0-0.911c-0.252-0.252-0.659-0.252-0.911,0l-7.764,7.763L4.152,9.267c-0.252-0.251-0.66-0.251-0.911,0c-0.252,0.252-0.252,0.66,0,0.911L7.629,14.566z"
                        style="stroke: white;fill:white"
                      />
                    </svg>
                  </p-check>
                  <span style="cursor:pointer">{{item.label}}</span>
                  <i class="el-icon-arrow-down" style="cursor:pointer"></i>
                </div>
              </el-popover>
            </template>
          </div>
        </div>
        <!-- 1 -->
        <div class="area-item">
          <div class="left-check">
            <p-check class="p-svg p-curve" color="success" v-model="hzcheck">
              <svg slot="extra" class="svg svg-icon" viewBox="0 0 20 20">
                <path
                  d="M7.629,14.566c0.125,0.125,0.291,0.188,0.456,0.188c0.164,0,0.329-0.062,0.456-0.188l8.219-8.221c0.252-0.252,0.252-0.659,0-0.911c-0.252-0.252-0.659-0.252-0.911,0l-7.764,7.763L4.152,9.267c-0.252-0.251-0.66-0.251-0.911,0c-0.252,0.252-0.252,0.66,0,0.911L7.629,14.566z"
                  style="stroke: white;fill:white"
                />
              </svg>
              华中
            </p-check>
          </div>
          <div class="right-check">
            <template v-for="(item,index) in region.hz">
              <el-popover
                placement="bottom-start"
                width="100"
                trigger="click"
                :key="index"
                class="area-p"
              >
                <div style="display:flex;justify-content: center;flex-direction: column">
                  <template v-if="item.children">
                    <template v-for="(value,key) in item.children">
                      <p-check
                        class="p-svg p-curve"
                        color="success"
                        slot="reference"
                        v-model="value.checked"
                        :key="key"
                        style="margin:4px 0"
                      >
                        <svg slot="extra" class="svg svg-icon" viewBox="0 0 20 20">
                          <path
                            d="M7.629,14.566c0.125,0.125,0.291,0.188,0.456,0.188c0.164,0,0.329-0.062,0.456-0.188l8.219-8.221c0.252-0.252,0.252-0.659,0-0.911c-0.252-0.252-0.659-0.252-0.911,0l-7.764,7.763L4.152,9.267c-0.252-0.251-0.66-0.251-0.911,0c-0.252,0.252-0.252,0.66,0,0.911L7.629,14.566z"
                            style="stroke: white;fill:white"
                          />
                        </svg>
                        {{value.label}}
                      </p-check>
                    </template>
                  </template>
                </div>

                <div slot="reference">
                  <p-check class="p-svg p-curve" color="success" v-model="item.checked">
                    <svg slot="extra" class="svg svg-icon" viewBox="0 0 20 20">
                      <path
                        d="M7.629,14.566c0.125,0.125,0.291,0.188,0.456,0.188c0.164,0,0.329-0.062,0.456-0.188l8.219-8.221c0.252-0.252,0.252-0.659,0-0.911c-0.252-0.252-0.659-0.252-0.911,0l-7.764,7.763L4.152,9.267c-0.252-0.251-0.66-0.251-0.911,0c-0.252,0.252-0.252,0.66,0,0.911L7.629,14.566z"
                        style="stroke: white;fill:white"
                      />
                    </svg>
                  </p-check>
                  <span style="cursor:pointer">{{item.label}}</span>
                  <i class="el-icon-arrow-down" style="cursor:pointer"></i>
                </div>
              </el-popover>
            </template>
          </div>
        </div>
        <!-- 1 -->
        <div class="area-item">
          <div class="left-check">
            <p-check class="p-svg p-curve" color="success" v-model="hncheck">
              <svg slot="extra" class="svg svg-icon" viewBox="0 0 20 20">
                <path
                  d="M7.629,14.566c0.125,0.125,0.291,0.188,0.456,0.188c0.164,0,0.329-0.062,0.456-0.188l8.219-8.221c0.252-0.252,0.252-0.659,0-0.911c-0.252-0.252-0.659-0.252-0.911,0l-7.764,7.763L4.152,9.267c-0.252-0.251-0.66-0.251-0.911,0c-0.252,0.252-0.252,0.66,0,0.911L7.629,14.566z"
                  style="stroke: white;fill:white"
                />
              </svg>
              华南
            </p-check>
          </div>
          <div class="right-check">
            <template v-for="(item,index) in region.hn">
              <el-popover
                placement="bottom-start"
                width="100"
                trigger="click"
                :key="index"
                class="area-p"
              >
                <div style="display:flex;justify-content: center;flex-direction: column">
                  <template v-if="item.children">
                    <template v-for="(value,key) in item.children">
                      <p-check
                        class="p-svg p-curve"
                        color="success"
                        slot="reference"
                        v-model="value.checked"
                        :key="key"
                        style="margin:4px 0"
                      >
                        <svg slot="extra" class="svg svg-icon" viewBox="0 0 20 20">
                          <path
                            d="M7.629,14.566c0.125,0.125,0.291,0.188,0.456,0.188c0.164,0,0.329-0.062,0.456-0.188l8.219-8.221c0.252-0.252,0.252-0.659,0-0.911c-0.252-0.252-0.659-0.252-0.911,0l-7.764,7.763L4.152,9.267c-0.252-0.251-0.66-0.251-0.911,0c-0.252,0.252-0.252,0.66,0,0.911L7.629,14.566z"
                            style="stroke: white;fill:white"
                          />
                        </svg>
                        {{value.label}}
                      </p-check>
                    </template>
                  </template>
                </div>

                <div slot="reference">
                  <p-check class="p-svg p-curve" color="success" v-model="item.checked">
                    <svg slot="extra" class="svg svg-icon" viewBox="0 0 20 20">
                      <path
                        d="M7.629,14.566c0.125,0.125,0.291,0.188,0.456,0.188c0.164,0,0.329-0.062,0.456-0.188l8.219-8.221c0.252-0.252,0.252-0.659,0-0.911c-0.252-0.252-0.659-0.252-0.911,0l-7.764,7.763L4.152,9.267c-0.252-0.251-0.66-0.251-0.911,0c-0.252,0.252-0.252,0.66,0,0.911L7.629,14.566z"
                        style="stroke: white;fill:white"
                      />
                    </svg>
                  </p-check>
                  <span style="cursor:pointer">{{item.label}}</span>
                  <i class="el-icon-arrow-down" style="cursor:pointer"></i>
                </div>
              </el-popover>
            </template>
          </div>
        </div>
        <!-- 1 -->
        <div class="area-item">
          <div class="left-check">
            <p-check class="p-svg p-curve" color="success" v-model="hbcheck">
              <svg slot="extra" class="svg svg-icon" viewBox="0 0 20 20">
                <path
                  d="M7.629,14.566c0.125,0.125,0.291,0.188,0.456,0.188c0.164,0,0.329-0.062,0.456-0.188l8.219-8.221c0.252-0.252,0.252-0.659,0-0.911c-0.252-0.252-0.659-0.252-0.911,0l-7.764,7.763L4.152,9.267c-0.252-0.251-0.66-0.251-0.911,0c-0.252,0.252-0.252,0.66,0,0.911L7.629,14.566z"
                  style="stroke: white;fill:white"
                />
              </svg>
              华北
            </p-check>
          </div>
          <div class="right-check">
            <template v-for="(item,index) in region.hb">
              <el-popover
                placement="bottom-start"
                width="100"
                trigger="click"
                :key="index"
                class="area-p"
              >
                <div style="display:flex;justify-content: center;flex-direction: column">
                  <template v-if="item.children">
                    <template v-for="(value,key) in item.children">
                      <p-check
                        class="p-svg p-curve"
                        color="success"
                        slot="reference"
                        v-model="value.checked"
                        :key="key"
                        style="margin:4px 0"
                      >
                        <svg slot="extra" class="svg svg-icon" viewBox="0 0 20 20">
                          <path
                            d="M7.629,14.566c0.125,0.125,0.291,0.188,0.456,0.188c0.164,0,0.329-0.062,0.456-0.188l8.219-8.221c0.252-0.252,0.252-0.659,0-0.911c-0.252-0.252-0.659-0.252-0.911,0l-7.764,7.763L4.152,9.267c-0.252-0.251-0.66-0.251-0.911,0c-0.252,0.252-0.252,0.66,0,0.911L7.629,14.566z"
                            style="stroke: white;fill:white"
                          />
                        </svg>
                        {{value.label}}
                      </p-check>
                    </template>
                  </template>
                </div>

                <div slot="reference">
                  <p-check class="p-svg p-curve" color="success" v-model="item.checked">
                    <svg slot="extra" class="svg svg-icon" viewBox="0 0 20 20">
                      <path
                        d="M7.629,14.566c0.125,0.125,0.291,0.188,0.456,0.188c0.164,0,0.329-0.062,0.456-0.188l8.219-8.221c0.252-0.252,0.252-0.659,0-0.911c-0.252-0.252-0.659-0.252-0.911,0l-7.764,7.763L4.152,9.267c-0.252-0.251-0.66-0.251-0.911,0c-0.252,0.252-0.252,0.66,0,0.911L7.629,14.566z"
                        style="stroke: white;fill:white"
                      />
                    </svg>
                  </p-check>
                  <span style="cursor:pointer">{{item.label}}</span>
                  <i class="el-icon-arrow-down" style="cursor:pointer"></i>
                </div>
              </el-popover>
            </template>
          </div>
        </div>
        <!-- 1 -->
        <div class="area-item">
          <div class="left-check">
            <p-check class="p-svg p-curve" color="success" v-model="xbcheck">
              <svg slot="extra" class="svg svg-icon" viewBox="0 0 20 20">
                <path
                  d="M7.629,14.566c0.125,0.125,0.291,0.188,0.456,0.188c0.164,0,0.329-0.062,0.456-0.188l8.219-8.221c0.252-0.252,0.252-0.659,0-0.911c-0.252-0.252-0.659-0.252-0.911,0l-7.764,7.763L4.152,9.267c-0.252-0.251-0.66-0.251-0.911,0c-0.252,0.252-0.252,0.66,0,0.911L7.629,14.566z"
                  style="stroke: white;fill:white"
                />
              </svg>
              西北
            </p-check>
          </div>
          <div class="right-check">
            <template v-for="(item,index) in region.xb">
              <el-popover
                placement="bottom-start"
                width="100"
                trigger="click"
                :key="index"
                class="area-p"
              >
                <div style="display:flex;justify-content: center;flex-direction: column">
                  <template v-if="item.children">
                    <template v-for="(value,key) in item.children">
                      <p-check
                        class="p-svg p-curve"
                        color="success"
                        slot="reference"
                        v-model="value.checked"
                        :key="key"
                        style="margin:4px 0"
                      >
                        <svg slot="extra" class="svg svg-icon" viewBox="0 0 20 20">
                          <path
                            d="M7.629,14.566c0.125,0.125,0.291,0.188,0.456,0.188c0.164,0,0.329-0.062,0.456-0.188l8.219-8.221c0.252-0.252,0.252-0.659,0-0.911c-0.252-0.252-0.659-0.252-0.911,0l-7.764,7.763L4.152,9.267c-0.252-0.251-0.66-0.251-0.911,0c-0.252,0.252-0.252,0.66,0,0.911L7.629,14.566z"
                            style="stroke: white;fill:white"
                          />
                        </svg>
                        {{value.label}}
                      </p-check>
                    </template>
                  </template>
                </div>

                <div slot="reference">
                  <p-check class="p-svg p-curve" color="success" v-model="item.checked">
                    <svg slot="extra" class="svg svg-icon" viewBox="0 0 20 20">
                      <path
                        d="M7.629,14.566c0.125,0.125,0.291,0.188,0.456,0.188c0.164,0,0.329-0.062,0.456-0.188l8.219-8.221c0.252-0.252,0.252-0.659,0-0.911c-0.252-0.252-0.659-0.252-0.911,0l-7.764,7.763L4.152,9.267c-0.252-0.251-0.66-0.251-0.911,0c-0.252,0.252-0.252,0.66,0,0.911L7.629,14.566z"
                        style="stroke: white;fill:white"
                      />
                    </svg>
                  </p-check>
                  <span style="cursor:pointer">{{item.label}}</span>
                  <i class="el-icon-arrow-down" style="cursor:pointer"></i>
                </div>
              </el-popover>
            </template>
          </div>
        </div>
        <!-- 1 -->
        <div class="area-item">
          <div class="left-check">
            <p-check class="p-svg p-curve" color="success" v-model="xncheck">
              <svg slot="extra" class="svg svg-icon" viewBox="0 0 20 20">
                <path
                  d="M7.629,14.566c0.125,0.125,0.291,0.188,0.456,0.188c0.164,0,0.329-0.062,0.456-0.188l8.219-8.221c0.252-0.252,0.252-0.659,0-0.911c-0.252-0.252-0.659-0.252-0.911,0l-7.764,7.763L4.152,9.267c-0.252-0.251-0.66-0.251-0.911,0c-0.252,0.252-0.252,0.66,0,0.911L7.629,14.566z"
                  style="stroke: white;fill:white"
                />
              </svg>
              西南
            </p-check>
          </div>
          <div class="right-check">
            <template v-for="(item,index) in region.xn">
              <el-popover
                placement="bottom-start"
                width="100"
                trigger="click"
                :key="index"
                class="area-p"
              >
                <div style="display:flex;justify-content: center;flex-direction: column">
                  <template v-if="item.children">
                    <template v-for="(value,key) in item.children">
                      <p-check
                        class="p-svg p-curve"
                        color="success"
                        slot="reference"
                        v-model="value.checked"
                        :key="key"
                        style="margin:4px 0"
                      >
                        <svg slot="extra" class="svg svg-icon" viewBox="0 0 20 20">
                          <path
                            d="M7.629,14.566c0.125,0.125,0.291,0.188,0.456,0.188c0.164,0,0.329-0.062,0.456-0.188l8.219-8.221c0.252-0.252,0.252-0.659,0-0.911c-0.252-0.252-0.659-0.252-0.911,0l-7.764,7.763L4.152,9.267c-0.252-0.251-0.66-0.251-0.911,0c-0.252,0.252-0.252,0.66,0,0.911L7.629,14.566z"
                            style="stroke: white;fill:white"
                          />
                        </svg>
                        {{value.label}}
                      </p-check>
                    </template>
                  </template>
                </div>

                <div slot="reference">
                  <p-check class="p-svg p-curve" color="success" v-model="item.checked">
                    <svg slot="extra" class="svg svg-icon" viewBox="0 0 20 20">
                      <path
                        d="M7.629,14.566c0.125,0.125,0.291,0.188,0.456,0.188c0.164,0,0.329-0.062,0.456-0.188l8.219-8.221c0.252-0.252,0.252-0.659,0-0.911c-0.252-0.252-0.659-0.252-0.911,0l-7.764,7.763L4.152,9.267c-0.252-0.251-0.66-0.251-0.911,0c-0.252,0.252-0.252,0.66,0,0.911L7.629,14.566z"
                        style="stroke: white;fill:white"
                      />
                    </svg>
                  </p-check>
                  <span style="cursor:pointer">{{item.label}}</span>
                  <i class="el-icon-arrow-down" style="cursor:pointer"></i>
                </div>
              </el-popover>
            </template>
          </div>
        </div>
        <!-- 1 -->
        <div class="area-item">
          <div class="left-check">
            <p-check class="p-svg p-curve" color="success" v-model="gatcheck">
              <svg slot="extra" class="svg svg-icon" viewBox="0 0 20 20">
                <path
                  d="M7.629,14.566c0.125,0.125,0.291,0.188,0.456,0.188c0.164,0,0.329-0.062,0.456-0.188l8.219-8.221c0.252-0.252,0.252-0.659,0-0.911c-0.252-0.252-0.659-0.252-0.911,0l-7.764,7.763L4.152,9.267c-0.252-0.251-0.66-0.251-0.911,0c-0.252,0.252-0.252,0.66,0,0.911L7.629,14.566z"
                  style="stroke: white;fill:white"
                />
              </svg>
              港澳台
            </p-check>
          </div>
          <div class="right-check">
            <template v-for="(item,index) in region.gat">
              <el-popover
                placement="bottom-start"
                width="100"
                trigger="click"
                :key="index"
                class="area-p"
              >
                <div style="display:flex;justify-content: center;flex-direction: column">
                  <template v-if="item.children">
                    <template v-for="(value,key) in item.children">
                      <p-check
                        class="p-svg p-curve"
                        color="success"
                        slot="reference"
                        v-model="value.checked"
                        :key="key"
                        style="margin:4px 0"
                      >
                        <svg slot="extra" class="svg svg-icon" viewBox="0 0 20 20">
                          <path
                            d="M7.629,14.566c0.125,0.125,0.291,0.188,0.456,0.188c0.164,0,0.329-0.062,0.456-0.188l8.219-8.221c0.252-0.252,0.252-0.659,0-0.911c-0.252-0.252-0.659-0.252-0.911,0l-7.764,7.763L4.152,9.267c-0.252-0.251-0.66-0.251-0.911,0c-0.252,0.252-0.252,0.66,0,0.911L7.629,14.566z"
                            style="stroke: white;fill:white"
                          />
                        </svg>
                        {{value.label}}
                      </p-check>
                    </template>
                  </template>
                </div>

                <div slot="reference">
                  <p-check class="p-svg p-curve" color="success" v-model="item.checked">
                    <svg slot="extra" class="svg svg-icon" viewBox="0 0 20 20">
                      <path
                        d="M7.629,14.566c0.125,0.125,0.291,0.188,0.456,0.188c0.164,0,0.329-0.062,0.456-0.188l8.219-8.221c0.252-0.252,0.252-0.659,0-0.911c-0.252-0.252-0.659-0.252-0.911,0l-7.764,7.763L4.152,9.267c-0.252-0.251-0.66-0.251-0.911,0c-0.252,0.252-0.252,0.66,0,0.911L7.629,14.566z"
                        style="stroke: white;fill:white"
                      />
                    </svg>
                  </p-check>
                  <span style="cursor:pointer">{{item.label}}</span>
                  <i class="el-icon-arrow-down" style="cursor:pointer"></i>
                </div>
              </el-popover>
            </template>
          </div>
        </div>
        <div class="area-item">
          <div class="left-check">
            <p-check class="p-svg p-curve" color="success" v-model="allcheck">
              <svg slot="extra" class="svg svg-icon" viewBox="0 0 20 20">
                <path
                  d="M7.629,14.566c0.125,0.125,0.291,0.188,0.456,0.188c0.164,0,0.329-0.062,0.456-0.188l8.219-8.221c0.252-0.252,0.252-0.659,0-0.911c-0.252-0.252-0.659-0.252-0.911,0l-7.764,7.763L4.152,9.267c-0.252-0.251-0.66-0.251-0.911,0c-0.252,0.252-0.252,0.66,0,0.911L7.629,14.566z"
                  style="stroke: white;fill:white"
                />
              </svg>
            </p-check>全部
          </div>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitRegion">提交</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import region from "../../../../assets/region";

export default {
  props: ["regionVisible", "regionValue"],
  mounted() {},
  data() {
    return {
      region: region,
      dialogVisible: false,
      dbcheck: false,
      xbcheck: false,
      xncheck: false,
      hdcheck: false,
      hzcheck: false,
      hncheck: false,
      hbcheck: false,
      gatcheck: false,
      allcheck: false,
      areaSelectList: "",
      selectAreaProp: ""
    };
  },
  methods: {
    // 提交
    submitRegion() {
      let keys = Object.keys(this.region);
      let areaArr = [];
      keys.map((key, keyIndex) => {
        this.region[key].map((item, itemIndex) => {
          if (item.checked) {
            areaArr.push(item.value);
          }
          if (item.children) {
            item.children.map((value, valueIndex) => {
              if (value.checked) {
                areaArr.push(value.value);
              }
            });
          }
        });
      });
      this.selectAreaProp = areaArr.join(",");
      this.$emit("update:regionValue", this.selectAreaProp);
      this.dialogVisible = false;
    },
    // 通过value获取地区对象
    findAreaObj() {
	let keys = Object.keys(this.region);
	// 清空选中的区域
      keys.map((key, keyIndex) => {
        this.region[key].map((region, reginindex) => {
          region.checked = false;
          if (region.children) {
            region.children.map(item => {
              item.checked = false;
            });
          }
        });
      });
      if (this.selectAreaProp) {       
        // 获取选中的地区
        let arr = this.selectAreaProp.split(",");
        keys.map((key, keyIndex) => {
          arr.map((bj, bjindex) => {
            this.region[key].find(item => {
              item.value == bj ? (item.checked = true) : "";
            });
            this.region[key].map((region, reginindex) => {
              if (region.children) {
                region.children.find(item => {
                  item.value == bj ? (item.checked = true) : "";
                });
              }
            });
          });
        });
      } else {
        // 清空选中的地区
      }
    }
  },
  watch: {
    regionVisible(v) {
      this.dialogVisible = v;
    },
    dialogVisible(v) {
      this.$emit("update:regionVisible", v);
    },
    regionValue(value) {
      this.selectAreaProp = value;
      this.findAreaObj();
    },

    dbcheck(value) {
      if (value) {
        this.region.db.map((item, index) => {
          item.checked = true;
        });
      } else {
        this.region.db.map((item, index) => {
          item.checked = false;
        });
      }
    },
    xbcheck(value) {
      if (value) {
        this.region.xb.map((item, index) => {
          item.checked = true;
        });
      } else {
        this.region.xb.map((item, index) => {
          item.checked = false;
        });
      }
    },
    xncheck(value) {
      if (value) {
        this.region.xn.map((item, index) => {
          item.checked = true;
        });
      } else {
        this.region.xn.map((item, index) => {
          item.checked = false;
        });
      }
    },
    hdcheck(value) {
      if (value) {
        this.region.hd.map((item, index) => {
          item.checked = true;
        });
      } else {
        this.region.hd.map((item, index) => {
          item.checked = false;
        });
      }
    },
    hzcheck(value) {
      if (value) {
        this.region.hz.map((item, index) => {
          item.checked = true;
        });
      } else {
        this.region.hz.map((item, index) => {
          item.checked = false;
        });
      }
    },
    hncheck(value) {
      if (value) {
        this.region.hn.map((item, index) => {
          item.checked = true;
        });
      } else {
        this.region.hn.map((item, index) => {
          item.checked = false;
        });
      }
    },
    hbcheck(value) {
      if (value) {
        this.region.hb.map((item, index) => {
          item.checked = true;
        });
      } else {
        this.region.hb.map((item, index) => {
          item.checked = false;
        });
      }
    },
    gatcheck(value) {
      if (value) {
        this.region.gat.map((item, index) => {
          item.checked = true;
        });
      } else {
        this.region.gat.map((item, index) => {
          item.checked = false;
        });
      }
    },
    allcheck(value) {
      if (value) {
        this.dbcheck = true;
        this.xbcheck = true;
        this.xncheck = true;
        this.hdcheck = true;
        this.hzcheck = true;
        this.hncheck = true;
        this.hbcheck = true;
        this.gatcheck = true;
        this.allcheck = true;
      } else {
        this.dbcheck = false;
        this.xbcheck = false;
        this.xncheck = false;
        this.hdcheck = false;
        this.hzcheck = false;
        this.hncheck = false;
        this.hbcheck = false;
        this.gatcheck = false;
        this.allcheck = false;
      }
    }
  }
};
</script>

<style scoped>
.area-item {
  display: flex;
  width: 100%;
  margin-bottom: 30px;
}
.left-check {
  width: 150px;
}
.right-check {
  display: flex;
  flex-grow: 1;
  flex-flow: wrap;
}
.area-p {
  width: 33.33%;
  margin-bottom: 15px;
}
</style>
